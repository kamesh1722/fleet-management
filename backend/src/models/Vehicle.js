import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema(
  {
    vehicleId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    plateNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    make: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
    },
    vin: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    type: {
      type: String,
      enum: ['Heavy Truck', 'Medium Duty', 'Light Delivery', 'Cargo Van', 'Service Vehicle'],
      default: 'Heavy Truck',
    },
    fuelType: {
      type: String,
      enum: ['Diesel', 'Electric', 'Hybrid', 'Gasoline'],
      default: 'Diesel',
    },
    fuelLevelPercent: {
      type: Number,
      min: 0,
      max: 100,
      default: 85,
    },
    odometerKm: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      enum: ['Active', 'In Transit', 'Available', 'In Maintenance', 'Out of Service'],
      default: 'Available',
    },
    assignedDriver: {
      name: { type: String, default: 'Unassigned' },
      phone: { type: String, default: '' },
      licenseNumber: { type: String, default: '' },
    },
    healthStatus: {
      type: String,
      enum: ['Optimal', 'Good', 'Warning', 'Critical'],
      default: 'Optimal',
    },
    healthScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 95,
    },
    currentLocation: {
      address: { type: String, default: 'Central Logistics Hub' },
      city: { type: String, default: 'Chicago' },
      state: { type: String, default: 'IL' },
      latitude: { type: Number, default: 41.8781 },
      longitude: { type: Number, default: -87.6298 },
    },
    lastServiceDate: {
      type: Date,
      default: null,
    },
    nextServiceDueDate: {
      type: Date,
      default: null,
    },
    nextServiceDueKm: {
      type: Number,
      default: 0,
    },
    insurancePolicyNumber: {
      type: String,
      default: '',
    },
    insuranceExpiryDate: {
      type: Date,
      default: null,
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

vehicleSchema.index({ vehicleId: 1, plateNumber: 1, status: 1 });

export const Vehicle = mongoose.model('Vehicle', vehicleSchema);
