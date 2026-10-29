import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema(
  {
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
      default: null,
    },
    vehicleCode: {
      type: String,
      default: 'ALL',
    },
    type: {
      type: String,
      enum: ['Maintenance Due', 'Insurance Expiring', 'Diagnostic Fault', 'Fuel Anomaly', 'Compliance Alert', 'General'],
      default: 'General',
    },
    severity: {
      type: String,
      enum: ['info', 'warning', 'critical'],
      default: 'info',
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    actionRequired: {
      type: String,
      default: '',
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    isResolved: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

alertSchema.index({ createdAt: -1, severity: 1, isResolved: 1 });

export const Alert = mongoose.model('Alert', alertSchema);
