import { Maintenance } from '../models/Maintenance.js';
import { Vehicle } from '../models/Vehicle.js';

export const getMaintenanceRecords = async (req, res) => {
  try {
    const { status, priority, limit = 50 } = req.query;
    const query = {};
    if (status && status !== 'all') query.status = status;
    if (priority && priority !== 'all') query.priority = priority;

    const records = await Maintenance.find(query)
      .populate('vehicle', 'vehicleId plateNumber make model status odometerKm')
      .sort({ scheduledDate: 1 })
      .limit(parseInt(limit));

    res.json({ success: true, count: records.length, data: records });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createMaintenanceRecord = async (req, res) => {
  try {
    const record = new Maintenance(req.body);
    await record.save();

    // If marked in maintenance, update vehicle status if desired
    if (req.body.status === 'In Progress') {
      await Vehicle.findByIdAndUpdate(req.body.vehicle, { status: 'In Maintenance' });
    }

    res.status(201).json({ success: true, data: record, message: 'Maintenance record created' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateMaintenanceStatus = async (req, res) => {
  try {
    const { status, actualCost, notes } = req.body;
    const record = await Maintenance.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }

    if (status) record.status = status;
    if (actualCost !== undefined) record.actualCost = actualCost;
    if (notes) record.notes = notes;
    if (status === 'Completed') {
      record.completedDate = new Date();
      await Vehicle.findByIdAndUpdate(record.vehicle, {
        status: 'Available',
        lastServiceDate: new Date(),
      });
    }

    await record.save();
    res.json({ success: true, data: record, message: 'Status updated' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
