import React, { useState } from 'react';
import { Truck, Check, AlertCircle, Loader2 } from 'lucide-react';
import Modal from '../common/Modal';
import { vehicleService } from '../../services/api';
import { useFleet } from '../../context/FleetContext';

export const AddVehicleModal = ({ isOpen, onClose }) => {
  const { refreshData } = useFleet();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const initialForm = {
    vehicleId: '',
    plateNumber: '',
    make: 'Volvo',
    model: '',
    year: 2024,
    vin: '',
    type: 'Heavy Truck',
    fuelType: 'Diesel',
    fuelLevelPercent: 100,
    odometerKm: 0,
    status: 'Available',
    assignedDriver: {
      name: '',
      phone: '',
      licenseNumber: '',
    },
    notes: '',
  };

  const [formData, setFormData] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('driver.')) {
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        assignedDriver: { ...prev.assignedDriver, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!formData.vehicleId || !formData.plateNumber || !formData.model || !formData.vin) {
        throw new Error('Please fill in all required fleet identification fields.');
      }

      await vehicleService.create({
        ...formData,
        year: Number(formData.year),
        odometerKm: Number(formData.odometerKm),
        fuelLevelPercent: Number(formData.fuelLevelPercent),
      });

      setSuccess(true);
      refreshData();
      setTimeout(() => {
        setSuccess(false);
        setFormData(initialForm);
        onClose();
      }, 1200);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to register vehicle.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Register New Fleet Vehicle" maxWidth="max-w-2xl">
      {success ? (
        <div className="py-12 text-center">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <Check className="w-6 h-6 stroke-[3]" />
          </div>
          <h4 className="text-base font-bold text-slate-900">Vehicle Registered Successfully!</h4>
          <p className="text-xs text-slate-500 mt-1">
            Unit {formData.vehicleId} has been integrated into telemetry stream.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Vehicle ID / Code <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="vehicleId"
                value={formData.vehicleId}
                onChange={handleChange}
                placeholder="e.g. FLT-111"
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 uppercase font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                License Plate <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="plateNumber"
                value={formData.plateNumber}
                onChange={handleChange}
                placeholder="e.g. IL-991-APX"
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 uppercase font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Model Year <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                min="2010"
                max="2027"
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Manufacturer / Make <span className="text-rose-500">*</span>
              </label>
              <select
                name="make"
                value={formData.make}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
              >
                <option value="Volvo">Volvo</option>
                <option value="Freightliner">Freightliner</option>
                <option value="Kenworth">Kenworth</option>
                <option value="Peterbilt">Peterbilt</option>
                <option value="Mercedes-Benz">Mercedes-Benz</option>
                <option value="Ford">Ford</option>
                <option value="Isuzu">Isuzu</option>
                <option value="RAM">RAM</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Model Specification <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="e.g. VNL 860 Sleeper Cab"
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Vehicle Type <span className="text-rose-500">*</span>
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
              >
                <option value="Heavy Truck">Heavy Truck</option>
                <option value="Medium Duty">Medium Duty</option>
                <option value="Cargo Van">Cargo Van</option>
                <option value="Light Delivery">Light Delivery</option>
                <option value="Service Vehicle">Service Vehicle</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Powertrain / Fuel <span className="text-rose-500">*</span>
              </label>
              <select
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
              >
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Gasoline">Gasoline</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Initial Status <span className="text-rose-500">*</span>
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
              >
                <option value="Available">Available</option>
                <option value="Active">Active</option>
                <option value="In Transit">In Transit</option>
                <option value="In Maintenance">In Maintenance</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                VIN (Chassis Number) <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="vin"
                value={formData.vin}
                onChange={handleChange}
                placeholder="17-character VIN"
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 font-mono uppercase"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Current Odometer (km)
              </label>
              <input
                type="number"
                name="odometerKm"
                value={formData.odometerKm}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 font-mono"
              />
            </div>
          </div>

          {/* Driver details sub-card */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
            <span className="font-bold text-slate-800 block text-xs">Assigned Driver Details</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-slate-600 mb-1">Driver Name</label>
                <input
                  type="text"
                  name="driver.name"
                  value={formData.assignedDriver.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe (or leave blank)"
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-600 mb-1">Contact Phone</label>
                <input
                  type="text"
                  name="driver.phone"
                  value={formData.assignedDriver.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold flex items-center gap-2 shadow-sm"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>Register Vehicle</span>
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default AddVehicleModal;
