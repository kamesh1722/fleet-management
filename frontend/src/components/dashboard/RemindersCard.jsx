import React, { useState } from 'react';
import {
  Wrench,
  ShieldAlert,
  Calendar,
  Clock,
  ChevronRight,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import Badge from '../common/Badge';
import { useFleet } from '../../context/FleetContext';

export const RemindersCard = () => {
  const { reminders, setActiveTab } = useFleet();
  const [activeSubTab, setActiveSubTab] = useState('maintenance'); // 'maintenance' | 'insurance'

  const upcomingServices = reminders?.upcomingServices || [];
  const expiringInsurances = reminders?.expiringInsurances || [];

  const getDaysRemaining = (targetDate) => {
    if (!targetDate) return null;
    const diffTime = new Date(targetDate) - new Date();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="fleet-card p-6 flex flex-col justify-between">
      <div>
        {/* Header with Switcher Tabs */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-base text-slate-900">Compliance & Reminders</h3>
            <p className="text-xs text-slate-500">Upcoming preventative tickets & policy renewals</p>
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setActiveSubTab('maintenance')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-all ${
                activeSubTab === 'maintenance'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Service ({upcomingServices.length})</span>
            </button>
            <button
              onClick={() => setActiveSubTab('insurance')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-all ${
                activeSubTab === 'insurance'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Insurance ({expiringInsurances.length})</span>
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="mt-4 space-y-3">
          {activeSubTab === 'maintenance' ? (
            upcomingServices.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500">
                <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                All preventative maintenance is up to date.
              </div>
            ) : (
              upcomingServices.slice(0, 4).map((service) => {
                const daysLeft = getDaysRemaining(service.scheduledDate);
                const isOverdue = daysLeft !== null && daysLeft < 0;

                return (
                  <div
                    key={service._id}
                    className="p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all flex items-start justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-xs">
                          {service.vehicleCode || 'FLT'}
                        </span>
                        <Badge status={service.priority} size="sm" withDot={false} />
                        {isOverdue && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-rose-100 text-rose-700">
                            Overdue
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-medium text-slate-700 line-clamp-1">
                        {service.serviceType}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          {new Date(service.scheduledDate).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                        <span>•</span>
                        <span>{service.serviceCenter || 'Fleet Care Bay'}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span
                        className={`text-xs font-bold block ${
                          isOverdue
                            ? 'text-rose-600'
                            : daysLeft <= 3
                            ? 'text-amber-600'
                            : 'text-slate-700'
                        }`}
                      >
                        {isOverdue
                          ? `${Math.abs(daysLeft)}d overdue`
                          : daysLeft === 0
                          ? 'Today'
                          : `in ${daysLeft} days`}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        ₹{service.estimatedCost?.toLocaleString('en-IN')} est
                      </span>
                    </div>
                  </div>
                );
              })
            )
          ) : expiringInsurances.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">
              <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              All fleet insurance policies are fully active.
            </div>
          ) : (
            expiringInsurances.slice(0, 4).map((policy) => {
              const daysLeft = getDaysRemaining(policy.expiryDate);

              return (
                <div
                  key={policy._id}
                  className="p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-xs">
                        {policy.vehicleCode || 'FLT'}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-200 text-slate-700">
                        {policy.policyNumber}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-slate-700">
                      {policy.provider} ({policy.coverageType})
                    </p>
                    <div className="text-[11px] text-slate-500">
                      Expires:{' '}
                      <span className="font-semibold text-slate-700">
                        {new Date(policy.expiryDate).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span
                      className={`text-xs font-bold block ${
                        daysLeft <= 15 ? 'text-rose-600 font-extrabold' : 'text-amber-600'
                      }`}
                    >
                      {daysLeft <= 0 ? 'Expired' : `${daysLeft} days left`}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      ₹{policy.annualPremium?.toLocaleString('en-IN')}/yr
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Footer link */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <button
          onClick={() => setActiveTab(activeSubTab === 'maintenance' ? 'maintenance' : 'insurance')}
          className="text-sky-600 font-semibold hover:underline flex items-center gap-1"
        >
          <span>Manage full {activeSubTab} schedules</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default RemindersCard;
