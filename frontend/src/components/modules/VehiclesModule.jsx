import React, { useState, useEffect } from 'react';
import {
  Truck,
  Plus,
  Search,
  Filter,
  Trash2,
  ExternalLink,
  Shield,
  Fuel,
  Wrench,
  Loader2,
} from 'lucide-react';
import { vehicleService } from '../../services/api';
import Badge from '../common/Badge';
import { useFleet } from '../../context/FleetContext';
import VehicleDetailModal from '../dashboard/VehicleDetailModal';

export const VehiclesModule = () => {
  const { setIsAddVehicleOpen, refreshData } = useFleet();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const loadVehicles = async () => {
    try {
      setLoading(true);
      const res = await vehicleService.getAll({
        search,
        status: statusFilter,
        type: typeFilter,
      });
      if (res.success) {
        setVehicles(res.data);
      }
    } catch (err) {
      console.error('Failed to load vehicles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, [search, statusFilter, typeFilter]);

  const handleDelete = async (e, id, code) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to decommission and remove unit ${code}?`)) {
      try {
        await vehicleService.delete(id);
        loadVehicles();
        refreshData();
      } catch (err) {
        alert('Failed to delete vehicle.');
      }
    }
  };

  return (
    <div className="space-y-5">
      {/* Module Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Vehicle Fleet Directory</h2>
          <p className="text-xs text-slate-500">
            Comprehensive registry of heavy transport, medium duty, and delivery assets
          </p>
        </div>

        <button
          onClick={() => setIsAddVehicleOpen(true)}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-sky-400 stroke-[2.5]" />
          <span>Add New Vehicle</span>
        </button>
      </div>

      {/* Search & Filter Controls */}
      <div className="p-4 bg-white rounded-xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by ID, plate, VIN, model..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-800"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-500">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700"
            >
              <option value="all">All Statuses</option>
              <option value="Active">Active</option>
              <option value="In Transit">In Transit</option>
              <option value="Available">Available</option>
              <option value="In Maintenance">In Maintenance</option>
              <option value="Out of Service">Out of Service</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-500">Class:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700"
            >
              <option value="all">All Classes</option>
              <option value="Heavy Truck">Heavy Truck</option>
              <option value="Medium Duty">Medium Duty</option>
              <option value="Cargo Van">Cargo Van</option>
              <option value="Service Vehicle">Service Vehicle</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Vehicle Cards */}
      {loading ? (
        <div className="py-20 text-center text-slate-500 text-xs">
          <Loader2 className="w-8 h-8 text-sky-600 animate-spin mx-auto mb-2" />
          <span>Synchronizing fleet data from MongoDB...</span>
        </div>
      ) : vehicles.length === 0 ? (
        <div className="fleet-card p-12 text-center text-slate-500 text-xs">
          <Truck className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="font-semibold text-slate-800 text-sm">No vehicles matched your search.</p>
          <p className="mt-1">Try resetting the filter criteria or register a new asset.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vehicles.map((v) => (
            <div
              key={v._id}
              onClick={() => setSelectedVehicle(v)}
              className="fleet-card p-5 cursor-pointer hover:border-sky-300 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-900 text-sm group-hover:text-sky-600 transition-colors">
                        {v.vehicleId}
                      </span>
                      <span className="font-mono text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                        {v.plateNumber}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 font-medium">
                      {v.year} {v.make} {v.model}
                    </p>
                  </div>
                  <Badge status={v.status} size="sm" />
                </div>

                {/* Telemetry quick indicators */}
                <div className="my-4 grid grid-cols-2 gap-2 text-xs p-3 bg-slate-50/80 rounded-xl border border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Class / Fuel</span>
                    <span className="font-semibold text-slate-800">
                      {v.type} ({v.fuelType})
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Odometer</span>
                    <span className="font-mono font-semibold text-slate-800">
                      {v.odometerKm?.toLocaleString()} km
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Driver</span>
                    <span className="font-semibold text-slate-800 truncate block">
                      {v.assignedDriver?.name || 'Unassigned'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Health Index</span>
                    <span className="font-semibold text-emerald-600">{v.healthScore}/100 ({v.healthStatus})</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">
                  {v.currentLocation?.city}, {v.currentLocation?.state}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleDelete(e, v._id, v.vehicleId)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Decommission Vehicle"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setSelectedVehicle(v)}
                    className="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                    title="View Telemetry"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Vehicle detail modal */}
      <VehicleDetailModal
        vehicle={selectedVehicle}
        isOpen={!!selectedVehicle}
        onClose={() => setSelectedVehicle(null)}
      />
    </div>
  );
};

export default VehiclesModule;
