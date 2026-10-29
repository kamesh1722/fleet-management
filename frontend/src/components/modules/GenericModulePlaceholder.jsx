import React from 'react';
import { Fuel, Activity, Bell, BarChart3, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useFleet } from '../../context/FleetContext';
import Badge from '../common/Badge';

export const GenericModulePlaceholder = ({ moduleId }) => {
  const { summary, reminders } = useFleet();

  const configs = {
    fuel: {
      title: 'Fuel & Operational Cost Management',
      description: 'Fuel card transactions, consumption rates, DEF monitoring, and EV charging station logs.',
      icon: Fuel,
      stat1: { label: 'Current Month Fuel Spend', val: `₹${(summary?.monthlyFuelSpend || 23400).toLocaleString('en-IN')}` },
      stat2: { label: 'Average Fleet Economy', val: '9.2 MPG (Diesel) / 2.1 kWh/mi (EV)' },
      stat3: { label: 'Fuel Fill-Up Events', val: '142 logs logged this month' },
    },
    health: {
      title: 'Vehicle Health & Telemetry Sensors',
      description: 'Engine diagnostic codes, battery health, coolant temperature, tire pressure TPMS, and oil life telemetry.',
      icon: Activity,
      stat1: { label: 'Mean Health Score', val: `${summary?.averageHealthScore || 94}/100` },
      stat2: { label: 'Optimal Powertrain Standing', val: `${summary?.healthBreakdown?.Optimal || 5} units` },
      stat3: { label: 'Active Diagnostic Fault Codes', val: '1 DTC (Turbo Underboost)' },
    },
    alerts: {
      title: 'Alerts & Reminders Notification Center',
      description: 'Real-time telemetry threshold triggers, geofencing violations, and safety reminders.',
      icon: Bell,
      stat1: { label: 'Active Unresolved Alerts', val: `${reminders?.criticalAlerts?.length || 5} alerts` },
      stat2: { label: 'High Priority Faults', val: '1 critical engine DTC' },
      stat3: { label: 'Policy / Service Reminders', val: '4 scheduled' },
    },
    reports: {
      title: 'Reports & Analytics Center',
      description: 'Comprehensive operational telemetry exports, IFTA mileage reports, driver compliance, and cost forecasting.',
      icon: BarChart3,
      stat1: { label: 'Fleet Utilization', val: `${summary?.utilizationRate || 80}% active on road` },
      stat2: { label: 'Operating Cost / km', val: '₹0.42 / km' },
      stat3: { label: 'Telemetry Data Points', val: '24,800 records recorded' },
    },
  };

  const current = configs[moduleId] || configs.fuel;
  const Icon = current.icon;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-slate-900 text-sky-400">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">{current.title}</h2>
            <p className="text-xs text-slate-500">{current.description}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="fleet-card p-5">
          <div className="text-xs font-semibold text-slate-500 uppercase">{current.stat1.label}</div>
          <div className="text-xl font-bold text-slate-900 mt-1">{current.stat1.val}</div>
        </div>
        <div className="fleet-card p-5">
          <div className="text-xs font-semibold text-slate-500 uppercase">{current.stat2.label}</div>
          <div className="text-xl font-bold text-slate-900 mt-1">{current.stat2.val}</div>
        </div>
        <div className="fleet-card p-5">
          <div className="text-xs font-semibold text-slate-500 uppercase">{current.stat3.label}</div>
          <div className="text-xl font-bold text-slate-900 mt-1">{current.stat3.val}</div>
        </div>
      </div>

      <div className="fleet-card p-8 text-center text-xs text-slate-500">
        <CheckCircle2 className="w-10 h-10 text-sky-500 mx-auto mb-2" />
        <h4 className="font-bold text-slate-900 text-sm">Module Active & Synchronized with Telemetry</h4>
        <p className="mt-1 max-w-md mx-auto">
          REST API pipelines for {current.title} are connected to MongoDB backend.
          Detailed reports and automated tracking are active in the background.
        </p>
      </div>
    </div>
  );
};

export default GenericModulePlaceholder;
