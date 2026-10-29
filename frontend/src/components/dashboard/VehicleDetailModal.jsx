import React from 'react';
import {
  Truck,
  MapPin,
  Calendar,
  Fuel,
  Activity,
  Shield,
  Wrench,
  User,
  Phone,
  FileText,
  X,
} from 'lucide-react';
import Modal from '../common/Modal';
import Badge from '../common/Badge';

export const VehicleDetailModal = ({ vehicle, isOpen, onClose }) => {
  if (!vehicle) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Vehicle Diagnostics: ${vehicle.vehicleId}`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-5 text-xs text-slate-700">
        {/* Top Hero Banner */}
        <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold text-white">{vehicle.vehicleId}</span>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-sky-300">
                  {vehicle.plateNumber}
                </span>
              </div>
              <p className="text-slate-300 text-xs mt-0.5">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Badge status={vehicle.status} size="md" />
            <Badge status={vehicle.healthStatus} size="md" />
          </div>
        </div>

        {/* Specifications Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
          <div>
            <span className="text-slate-400 font-medium block">VIN Number</span>
            <span className="font-mono font-bold text-slate-900 break-all">{vehicle.vin}</span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block">Odometer</span>
            <span className="font-mono font-bold text-slate-900">
              {vehicle.odometerKm?.toLocaleString()} km
            </span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block">Vehicle Class</span>
            <span className="font-bold text-slate-900">{vehicle.type}</span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block">Powertrain</span>
            <span className="font-bold text-slate-900">{vehicle.fuelType}</span>
          </div>
        </div>

        {/* Telemetry Gauge & Driver Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Driver Card */}
          <div className="p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
              <User className="w-4 h-4 text-sky-600" />
              <span>Assigned Operator</span>
            </div>
            <div className="text-slate-800 font-semibold text-sm">
              {vehicle.assignedDriver?.name || 'Unassigned Unit'}
            </div>
            {vehicle.assignedDriver?.phone && (
              <div className="flex items-center gap-1.5 text-slate-500">
                <Phone className="w-3.5 h-3.5" />
                <span>{vehicle.assignedDriver.phone}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>
                {vehicle.currentLocation?.address}, {vehicle.currentLocation?.city},{' '}
                {vehicle.currentLocation?.state}
              </span>
            </div>
          </div>

          {/* Health & Fuel Card */}
          <div className="p-4 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
              <Activity className="w-4 h-4 text-emerald-600" />
              <span>ECU Telemetry Sensors</span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span>Fuel / Battery Gauge</span>
                <span className="font-bold">{vehicle.fuelLevelPercent}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  style={{ width: `${vehicle.fuelLevelPercent}%` }}
                  className="h-full bg-sky-500 rounded-full"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span>Overall Component Health</span>
                <span className="font-bold">{vehicle.healthScore}/100</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  style={{ width: `${vehicle.healthScore}%` }}
                  className={`h-full rounded-full ${
                    vehicle.healthScore > 85 ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Service & Insurance Summary */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
          <span className="font-bold text-slate-900 block text-xs">Maintenance & Compliance Schedule</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-slate-400" />
              <div>
                <span className="text-slate-500 block">Next Service Target:</span>
                <span className="font-semibold text-slate-800">
                  {vehicle.nextServiceDueDate
                    ? new Date(vehicle.nextServiceDueDate).toLocaleDateString()
                    : 'Scheduled as per interval'}{' '}
                  ({vehicle.nextServiceDueKm?.toLocaleString()} km)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-slate-400" />
              <div>
                <span className="text-slate-500 block">Insurance Policy:</span>
                <span className="font-semibold text-slate-800">
                  {vehicle.insurancePolicyNumber || 'POL-ACTIVE'} (
                  {vehicle.insuranceExpiryDate
                    ? `Exp: ${new Date(vehicle.insuranceExpiryDate).toLocaleDateString()}`
                    : 'Active'}
                  )
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-slate-400 text-[11px]">System Node: MONGO-REPLICA-1</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl"
          >
            Done
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default VehicleDetailModal;
