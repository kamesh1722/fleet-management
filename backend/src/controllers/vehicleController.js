import { Vehicle } from '../models/Vehicle.js';
import { Maintenance } from '../models/Maintenance.js';
import { Insurance } from '../models/Insurance.js';

export const getVehicles = async (req, res) => {
  try {
    const { status, type, search, sort = 'createdAt', order = 'desc', page = 1, limit = 20 } = req.query;
    const query = {};

    if (status && status !== 'all') {
      query.status = status;
    }
    if (type && type !== 'all') {
      query.type = type;
    }
    if (search) {
      query.$or = [
        { vehicleId: { $regex: search, $options: 'i' } },
        { plateNumber: { $regex: search, $options: 'i' } },
        { make: { $regex: search, $options: 'i' } },
        { model: { $regex: search, $options: 'i' } },
        { vin: { $regex: search, $options: 'i' } },
        { 'assignedDriver.name': { $regex: search, $options: 'i' } },
      ];
    }

    const sortOrder = order === 'asc' ? 1 : -1;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [vehicles, total] = await Promise.all([
      Vehicle.find(query)
        .sort({ [sort]: sortOrder })
        .skip(skip)
        .limit(parseInt(limit)),
      Vehicle.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: vehicles,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }

    const [maintenanceHistory, insurancePolicy] = await Promise.all([
      Maintenance.find({ vehicle: vehicle._id }).sort({ scheduledDate: -1 }),
      Insurance.findOne({ vehicle: vehicle._id }).sort({ expiryDate: -1 }),
    ]);

    res.json({
      success: true,
      data: {
        ...vehicle.toObject(),
        maintenanceHistory,
        insurancePolicy,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createVehicle = async (req, res) => {
  try {
    const existing = await Vehicle.findOne({
      $or: [{ vehicleId: req.body.vehicleId }, { vin: req.body.vin }, { plateNumber: req.body.plateNumber }],
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'A vehicle with this ID, VIN, or License Plate already exists',
      });
    }

    const vehicle = new Vehicle(req.body);
    await vehicle.save();

    res.status(201).json({
      success: true,
      data: vehicle,
      message: 'Vehicle registered successfully',
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }

    res.json({
      success: true,
      data: vehicle,
      message: 'Vehicle updated successfully',
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }

    res.json({
      success: true,
      message: `Vehicle ${vehicle.vehicleId} deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
