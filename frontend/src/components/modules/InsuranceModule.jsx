import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Calendar,
  DollarSign,
  Plus,
  Loader2,
  FileCheck,
  Building2,
} from 'lucide-react';
import { insuranceService } from '../../services/api';
import Badge from '../common/Badge';

export const InsuranceModule = () => {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        setLoading(true);
        const res = await insuranceService.getAll();
        if (res.success) {
          setPolicies(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPolicies();
  }, []);

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Insurance Policies & Compliance</h2>
          <p className="text-xs text-slate-500">
            Active fleet policies, coverage limits, policy renewal tracking, and liability terms
          </p>
        </div>

        <button
          onClick={() => alert('New Policy creation form dialog')}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-sky-400 stroke-[2.5]" />
          <span>Add Policy Record</span>
        </button>
      </div>

      {/* Insurance Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="fleet-card p-5">
          <div className="text-xs font-semibold text-slate-500 uppercase">Total Active Policies</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{policies.length} Policies</div>
          <div className="text-xs text-emerald-600 font-semibold mt-1">100% DOT Compliant</div>
        </div>
        <div className="fleet-card p-5">
          <div className="text-xs font-semibold text-slate-500 uppercase">Expiring in 30 Days</div>
          <div className="text-2xl font-bold text-amber-600 mt-1">
            {policies.filter((p) => p.status === 'Expiring Soon').length} Units
          </div>
          <div className="text-xs text-slate-500 mt-1">Renewals scheduled</div>
        </div>
        <div className="fleet-card p-5">
          <div className="text-xs font-semibold text-slate-500 uppercase">Annual Premium Spend</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            ₹{policies.reduce((acc, p) => acc + (p.annualPremium || 0), 0).toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-slate-500 mt-1">Commercial umbrella fleet rate</div>
        </div>
      </div>

      {/* Policies Table */}
      <div className="fleet-card overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900">Commercial Policies Directory</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold uppercase text-slate-500 border-b border-slate-100">
                <th className="py-3 px-5">Vehicle</th>
                <th className="py-3 px-4">Policy #</th>
                <th className="py-3 px-4">Underwriting Provider</th>
                <th className="py-3 px-4">Coverage Tier</th>
                <th className="py-3 px-4">Coverage Limit</th>
                <th className="py-3 px-4">Annual Premium</th>
                <th className="py-3 px-4">Expiration Date</th>
                <th className="py-3 px-5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-slate-500">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-sky-600" />
                    <span>Loading insurance policies...</span>
                  </td>
                </tr>
              ) : (
                policies.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-slate-900">{p.vehicleCode}</td>
                    <td className="py-3.5 px-4 font-mono font-medium text-slate-700">
                      {p.policyNumber}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">{p.provider}</td>
                    <td className="py-3.5 px-4 text-slate-600">{p.coverageType}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-700">
                      ₹{(p.coverageLimit || 1000000).toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      ₹{(p.annualPremium || 0).toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-700">
                      {new Date(p.expiryDate).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <Badge status={p.status} size="sm" />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InsuranceModule;
