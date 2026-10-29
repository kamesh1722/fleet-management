import React, { useState } from 'react';
import {
  Truck,
  MapPin,
  User,
  Fuel,
  Activity,
  ChevronRight,
  Filter,
  Eye,
  Search,
} from 'lucide-react';
import Badge from '../common/Badge';
import { useFleet } from '../../context/FleetContext';

export const RecentActivityTable = ({ onSelectVehicle }) => {
  const { recentVehicles, loading, searchQuery, setSearchQuery } = useFleet();
  const [statusFilter, setStatusFilter] = useState('all');

  const filterTabs = [
    { id: 'all', label: 'All Fleet' },
    { id: 'In Transit', label: 'In Transit' },
    { id: 'Active', label: 'Active' },
    { id: 'Available', label: 'Available' },
    { id: 'In Maintenance', label: 'In Maintenance' },
  ];

  const filteredVehicles = (recentVehicles || []).filter((v) => {
    const matchesStatus = statusFilter === 'all' || v.status === statusFilter;
    const matchesSearch =
      !searchQuery ||
      v.vehicleId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.plateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.assignedDriver?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="fleet-card overflow-hidden">
      {/* Table Header & Filter Bar */}
      <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-base text-slate-900">Recent Vehicle Activity & Telemetry</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 font-semibold text-slate-600">
              {filteredVehicles.length} Units
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time live status, operational odometer readings, and route telemetry
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                statusFilter === tab.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table responsive container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100">
              <th className="py-3 px-5">Vehicle & Model</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Assigned Driver</th>
              <th className="py-3 px-4">Current Location</th>
              <th className="py-3 px-4">Odometer</th>
              <th className="py-3 px-4">Fuel / Energy</th>
              <th className="py-3 px-4">Health</th>
              <th className="py-3 px-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {loading ? (
              <tr>
                <td colSpan="8" className="py-12 text-center text-slate-500">
                  <div className="inline-block animate-spin w-6 h-6 border-2 border-slate-300 border-t-sky-600 rounded-full mb-2" />
                  <div>Loading live vehicle data...</div>
                </td>
              </tr>
            ) : filteredVehicles.length === 0 ? (
              <tr>
                <td colSpan="8" className="py-12 text-center text-slate-500">
                  <Truck className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="font-medium text-slate-700">No vehicles match current criteria.</p>
                  <p className="text-xs text-slate-400 mt-1">Try clearing search or filters.</p>
                </td>
              </tr>
            ) : (
              filteredVehicles.map((vehicle) => (
                <tr
                  key={vehicle._id}
                  onClick={() => onSelectVehicle && onSelectVehicle(vehicle)}
                  className="hover:bg-slate-50/90 transition-colors cursor-pointer group"
                >
                  {/* Vehicle & Model */}
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-sky-50 flex items-center justify-center text-slate-700 group-hover:text-sky-600 transition-colors">
                        <Truck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 group-hover:text-sky-600 transition-colors flex items-center gap-2">
                          <span>{vehicle.vehicleId}</span>
                          <span className="font-mono text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-normal">
                            {vehicle.plateNumber}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 truncate max-w-[180px]">
                          {vehicle.make} {vehicle.model}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <Badge status={vehicle.status} />
                  </td>

                  {/* Driver */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-bold">
                        {vehicle.assignedDriver?.name ? vehicle.assignedDriver.name.charAt(0) : 'U'}
                      </div>
                      <div>
                        <span className="font-medium text-slate-800 block">
                          {vehicle.assignedDriver?.name || 'Unassigned'}
                        </span>
                        {vehicle.assignedDriver?.phone && (
                          <span className="text-[10px] text-slate-400 block">
                            {vehicle.assignedDriver.phone}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Location */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <div>
                        <span className="font-medium text-slate-800 block truncate max-w-[140px]">
                          {vehicle.currentLocation?.city || 'Chicago'}, {vehicle.currentLocation?.state || 'IL'}
                        </span>
                        <span className="text-[10px] text-slate-400 truncate max-w-[140px] block">
                          {vehicle.currentLocation?.address || 'Midwest Hub'}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Odometer */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="font-mono font-semibold text-slate-800">
                      {vehicle.odometerKm?.toLocaleString()} km
                    </span>
                  </td>

                  {/* Fuel / Energy Level */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="w-24">
                      <div className="flex justify-between text-[10px] font-medium text-slate-600 mb-1">
                        <span>{vehicle.fuelType}</span>
                        <span>{vehicle.fuelLevelPercent}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          style={{ width: `${vehicle.fuelLevelPercent}%` }}
                          className={`h-full rounded-full ${
                            vehicle.fuelLevelPercent > 40
                              ? 'bg-sky-500'
                              : vehicle.fuelLevelPercent > 20
                              ? 'bg-amber-500'
                              : 'bg-rose-500'
                          }`}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Health */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <Badge status={vehicle.healthStatus} size="sm" />
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-5 text-right whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectVehicle && onSelectVehicle(vehicle);
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                      title="Inspect Vehicle Telemetry"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Showing {filteredVehicles.length} of {recentVehicles.length} vehicles</span>
        <span className="text-sky-600 font-semibold cursor-pointer hover:underline">
          View all fleet vehicles & telemetry →
        </span>
      </div>
    </div>
  );
};

export default RecentActivityTable;
