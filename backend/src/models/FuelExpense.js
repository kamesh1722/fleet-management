import mongoose from 'mongoose';

const fuelExpenseSchema = new mongoose.Schema(
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
    fuelType: {
      type: String,
      enum: ['Diesel', 'Electric', 'Gasoline', 'DEF'],
      default: 'Diesel',
    },
    quantity: {
      type: Number,
      required: true,
    },
    unitCost: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    odometerReading: {
      type: Number,
      default: 0,
    },
    station: {
      type: String,
      default: 'Pilot Flying J / Love’s Travel Stop',
    },
    location: {
      type: String,
      default: 'I-80 Fuel Stop, Davenport, IA',
    },
    date: {
      type: Date,
      default: Date.now,
    },
    driverName: {
      type: String,
      default: 'Fleet Operator',
    },
    receiptNumber: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

fuelExpenseSchema.index({ date: -1, vehicle: 1 });

export const FuelExpense = mongoose.model('FuelExpense', fuelExpenseSchema);
