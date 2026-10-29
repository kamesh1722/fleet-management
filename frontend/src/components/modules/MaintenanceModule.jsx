import React, { useState, useEffect } from 'react';
import {
  Wrench,
  Plus,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  Building,
  Loader2,
} from 'lucide-react';
import { maintenanceService } from '../../services/api';
import Badge from '../common/Badge';
import Modal from '../common/Modal';
import { useFleet } from '../../context/FleetContext';

export const MaintenanceModule = () => {
  const { recentVehicles, refreshData } = useFleet();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');

  const [form, setForm] = useState({
    vehicle: '',
    vehicleCode: '',
    serviceType: '',
    category: 'Preventive',
    priority: 'Medium',
    status: 'Scheduled',
    scheduledDate: '',
    estimatedCost: 500,
    serviceCenter: 'Apex Fleet Midwest Center',
    technicianName: 'Master Tech Specialist',
    notes: '',
  });

  const loadMaintenance = async () => {
    try {
      setLoading(true);
      const res = await maintenanceService.getAll({ status: selectedStatus });
      if (res.success) {
        setRecords(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMaintenance();
  }, [selectedStatus]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const targetVehicle = recentVehicles.find((v) => v._id === form.vehicle);
      await maintenanceService.create({
        ...form,
        vehicleCode: targetVehicle ? targetVehicle.vehicleId : 'FLT',
      });
      setIsScheduleOpen(false);
      loadMaintenance();
      refreshData();
    } catch (err) {
      alert('Error creating maintenance schedule.');
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await maintenanceService.updateStatus(id, { status: newStatus });
      loadMaintenance();
      refreshData();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Maintenance & Service Scheduling</h2>
          <p className="text-xs text-slate-500">
            Work orders, inspection schedules, and preventative maintenance logs
          </p>
        </div>

        <button
          onClick={() => setIsScheduleOpen(true)}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-sky-400 stroke-[2.5]" />
          <span>Schedule Service</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-semibold">
        {['all', 'Scheduled', 'In Progress', 'Completed', 'Overdue'].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedStatus(tab)}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              selectedStatus === tab
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab === 'all' ? 'All Work Orders' : tab}
          </button>
        ))}
      </div>

      {/* Work Orders Table */}
      <div className="fleet-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-[11px] font-bold uppercase text-slate-500 border-b border-slate-100">
                <th className="py-3 px-5">Vehicle</th>
                <th className="py-3 px-4">Service Description</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Scheduled Date</th>
                <th className="py-3 px-4">Service Center & Tech</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-slate-500">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-sky-600" />
                    <span>Loading maintenance schedules...</span>
                  </td>
                </tr>
              ) : records.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-slate-500">
                    <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                    <span>No service records match this status.</span>
                  </td>
                </tr>
              ) : (
                records.map((r) => (
                  <tr key={r._id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-slate-900">
                      {r.vehicleCode}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">
                      {r.serviceType}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{r.category}</td>
                    <td className="py-3.5 px-4">
                      <Badge status={r.priority} size="sm" withDot={false} />
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-700">
                      {new Date(r.scheduledDate).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      <div>{r.serviceCenter}</div>
                      <div className="text-[10px] text-slate-400">{r.technicianName}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge status={r.status} size="sm" />
                    </td>
                    <td className="py-3.5 px-5 text-right space-x-1">
                      {r.status === 'Scheduled' && (
                        <button
                          onClick={() => handleUpdateStatus(r._id, 'In Progress')}
                          className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded text-[11px] font-semibold border border-amber-200"
                        >
                          Start
                        </button>
                      )}
                      {r.status === 'In Progress' && (
                        <button
                          onClick={() => handleUpdateStatus(r._id, 'Completed')}
                          className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded text-[11px] font-semibold border border-emerald-200"
                        >
                          Complete
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Schedule Service Modal */}
      <Modal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        title="Create Service Schedule"
      >
        <form onSubmit={handleCreate} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Target Vehicle</label>
            <select
              value={form.vehicle}
              onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
              required
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
            >
              <option value="">Select a vehicle...</option>
              {recentVehicles.map((v) => (
                <option key={v._id} value={v._id}>
                  {v.vehicleId} - {v.make} {v.model} ({v.plateNumber})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Service Task Title</label>
            <input
              type="text"
              value={form.serviceType}
              onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
              placeholder="e.g. 50,000 km Transmission & Brake Inspection"
              required
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
              >
                <option value="Preventive">Preventive</option>
                <option value="Routine">Routine</option>
                <option value="Corrective">Corrective</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Priority</label>
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Target Date</label>
              <input
                type="date"
                value={form.scheduledDate}
                onChange={(e) => setForm({ ...form, scheduledDate: e.target.value })}
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Est. Cost (₹)</label>
              <input
                type="number"
                value={form.estimatedCost}
                onChange={(e) => setForm({ ...form, estimatedCost: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsScheduleOpen(false)}
              className="px-4 py-2 border rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-slate-900 text-white font-bold rounded-xl"
            >
              Schedule Service
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MaintenanceModule;
