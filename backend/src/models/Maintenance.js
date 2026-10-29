import mongoose from 'mongoose';

const maintenanceSchema = new mongoose.Schema(
  {
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: true,
    },
    vehicleCode: {
      type: String,
      required: true,
    },
    serviceType: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ['Routine', 'Preventive', 'Corrective', 'Emergency', 'Inspection'],
      default: 'Preventive',
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Urgent'],
      default: 'Medium',
    },
    status: {
      type: String,
      enum: ['Scheduled', 'In Progress', 'Completed', 'Cancelled', 'Overdue'],
      default: 'Scheduled',
    },
    scheduledDate: {
      type: Date,
      required: true,
    },
    completedDate: {
      type: Date,
      default: null,
    },
    odometerReading: {
      type: Number,
      default: 0,
    },
    serviceCenter: {
      type: String,
      default: 'Apex Fleet Fleet Care Center',
    },
    technicianName: {
      type: String,
      default: 'Lead Tech Specialist',
    },
    estimatedCost: {
      type: Number,
      default: 0,
    },
    actualCost: {
      type: Number,
      default: 0,
    },
    partsReplaced: [
      {
        partName: String,
        cost: Number,
        quantity: Number,
      },
    ],
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

maintenanceSchema.index({ vehicle: 1, status: 1, scheduledDate: 1 });

export const Maintenance = mongoose.model('Maintenance', maintenanceSchema);
