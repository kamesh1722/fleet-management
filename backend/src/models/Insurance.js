import mongoose from 'mongoose';

const insuranceSchema = new mongoose.Schema(
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
    policyNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    provider: {
      type: String,
      required: true,
      trim: true,
    },
    coverageType: {
      type: String,
      enum: ['Comprehensive Fleet', 'Collision & Cargo', 'Commercial Auto Liability', 'All-Peril Fleet Shield'],
      default: 'Comprehensive Fleet',
    },
    startDate: {
      type: Date,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    annualPremium: {
      type: Number,
      required: true,
      default: 0,
    },
    deductible: {
      type: Number,
      default: 1000,
    },
    coverageLimit: {
      type: Number,
      default: 1000000,
    },
    status: {
      type: String,
      enum: ['Active', 'Expiring Soon', 'Expired', 'Renewed'],
      default: 'Active',
    },
    contactPerson: {
      name: { type: String, default: '' },
      phone: { type: String, default: '' },
      email: { type: String, default: '' },
    },
    documentsUrl: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

insuranceSchema.index({ expiryDate: 1, status: 1 });

export const Insurance = mongoose.model('Insurance', insuranceSchema);
