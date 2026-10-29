import { Vehicle } from '../models/Vehicle.js';
import { Maintenance } from '../models/Maintenance.js';
import { Insurance } from '../models/Insurance.js';
import { FuelExpense } from '../models/FuelExpense.js';
import { Alert } from '../models/Alert.js';

export const getDashboardSummary = async (req, res) => {
  try {
    const totalVehicles = await Vehicle.countDocuments();
    const activeVehicles = await Vehicle.countDocuments({
      status: { $in: ['Active', 'In Transit'] },
    });
    const availableVehicles = await Vehicle.countDocuments({ status: 'Available' });
    const inMaintenanceVehicles = await Vehicle.countDocuments({ status: 'In Maintenance' });
    const outOfServiceVehicles = await Vehicle.countDocuments({ status: 'Out of Service' });

    const utilizationRate = totalVehicles > 0 ? Math.round((activeVehicles / totalVehicles) * 100) : 0;

    // Upcoming services in next 30 days or pending
    const now = new Date();
    const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    const upcomingServices = await Maintenance.countDocuments({
      status: { $in: ['Scheduled', 'In Progress'] },
      scheduledDate: { $lte: thirtyDaysFromNow },
    });

    const urgentServices = await Maintenance.countDocuments({
      $or: [
        { priority: 'Urgent', status: { $ne: 'Completed' } },
        { status: 'Overdue' },
      ],
    });

    // Expiring insurance policies in next 30 days
    const expiringInsurancePolicies = await Insurance.countDocuments({
      expiryDate: { $gte: now, $lte: thirtyDaysFromNow },
    });

    // Health stats
    const healthAgg = await Vehicle.aggregate([
      {
        $group: {
          _id: '$healthStatus',
          count: { $sum: 1 },
          avgScore: { $avg: '$healthScore' },
        },
      },
    ]);

    const avgHealthScore = await Vehicle.aggregate([
      {
        $group: {
          _id: null,
          avg: { $avg: '$healthScore' },
        },
      },
    ]);

    const healthBreakdown = {
      Optimal: 0,
      Good: 0,
      Warning: 0,
      Critical: 0,
    };
    healthAgg.forEach((h) => {
      if (healthBreakdown[h._id] !== undefined) {
        healthBreakdown[h._id] = h.count;
      }
    });

    // Total monthly fuel & maintenance spend (current month)
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const fuelSpendMonth = await FuelExpense.aggregate([
      { $match: { date: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } },
    ]);
    const maintenanceSpendMonth = await Maintenance.aggregate([
      { $match: { updatedAt: { $gte: startOfMonth }, status: 'Completed' } },
      { $group: { _id: null, total: { $sum: '$actualCost' } } },
    ]);

    res.json({
      success: true,
      data: {
        totalVehicles,
        activeVehicles,
        availableVehicles,
        inMaintenanceVehicles,
        outOfServiceVehicles,
        utilizationRate,
        upcomingServices,
        urgentServices,
        expiringInsurancePolicies,
        averageHealthScore: Math.round(avgHealthScore[0]?.avg || 0),
        healthBreakdown,
        monthlyFuelSpend: Math.round(fuelSpendMonth[0]?.total || 0),
        monthlyMaintenanceSpend: Math.round(maintenanceSpendMonth[0]?.total || 0),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getRecentActivity = async (req, res) => {
  try {
    const { limit = 8, status, search } = req.query;
    const query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { vehicleId: { $regex: search, $options: 'i' } },
        { plateNumber: { $regex: search, $options: 'i' } },
        { model: { $regex: search, $options: 'i' } },
        { make: { $regex: search, $options: 'i' } },
        { 'assignedDriver.name': { $regex: search, $options: 'i' } },
      ];
    }

    const vehicles = await Vehicle.find(query)
      .sort({ updatedAt: -1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      count: vehicles.length,
      data: vehicles,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getReminders = async (req, res) => {
  try {
    const now = new Date();
    const fortyFiveDaysAhead = new Date(Date.now() + 45 * 24 * 60 * 60 * 1000);

    const upcomingServices = await Maintenance.find({
      status: { $in: ['Scheduled', 'In Progress', 'Overdue'] },
      scheduledDate: { $lte: fortyFiveDaysAhead },
    })
      .populate('vehicle', 'vehicleId plateNumber make model')
      .sort({ scheduledDate: 1 })
      .limit(6);

    const expiringInsurances = await Insurance.find({
      expiryDate: { $gte: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), $lte: fortyFiveDaysAhead },
    })
      .populate('vehicle', 'vehicleId plateNumber make model')
      .sort({ expiryDate: 1 })
      .limit(6);

    const criticalAlerts = await Alert.find({
      isResolved: false,
    })
      .sort({ createdAt: -1 })
      .limit(6);

    res.json({
      success: true,
      data: {
        upcomingServices,
        expiringInsurances,
        criticalAlerts,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAnalytics = async (req, res) => {
  try {
    // Generate 6-month historical trend
    const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
    const currentYear = new Date().getFullYear();

    // Aggregated real or simulated historical metrics for charts
    const costTrend = [
      { month: 'May', fuelCost: 18450, maintenanceCost: 8900, operationalCost: 27350 },
      { month: 'Jun', fuelCost: 19800, maintenanceCost: 11200, operationalCost: 31000 },
      { month: 'Jul', fuelCost: 21300, maintenanceCost: 7600, operationalCost: 28900 },
      { month: 'Aug', fuelCost: 20100, maintenanceCost: 13400, operationalCost: 33500 },
      { month: 'Sep', fuelCost: 22600, maintenanceCost: 9800, operationalCost: 32400 },
      { month: 'Oct', fuelCost: 23400, maintenanceCost: 10450, operationalCost: 33850 },
    ];

    const vehicleStatusBreakdown = await Vehicle.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    const fuelTypeBreakdown = await Vehicle.aggregate([
      {
        $group: {
          _id: '$fuelType',
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({
      success: true,
      data: {
        costTrend,
        vehicleStatusBreakdown,
        fuelTypeBreakdown,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
