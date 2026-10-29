import React, { useState } from 'react';
import {
  Calendar,
  Sparkles,
  Download,
  Filter,
  ShieldCheck,
  Radio,
  ArrowUpRight,
} from 'lucide-react';
import SummaryCards from './SummaryCards';
import AnalyticsSection from './AnalyticsSection';
import RecentActivityTable from './RecentActivityTable';
import RemindersCard from './RemindersCard';
import AddVehicleModal from './AddVehicleModal';
import VehicleDetailModal from './VehicleDetailModal';
import { useFleet } from '../../context/FleetContext';

export const DashboardOverview = () => {
  const { isAddVehicleOpen, setIsAddVehicleOpen, summary, lastRefreshed } = useFleet();
  const [inspectedVehicle, setInspectedVehicle] = useState(null);

  const currentDateFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  return (
    <div className="space-y-6">
      {/* Top Banner: Date, Fleet Operations Overview, Quick Telemetry Status */}
      <div className="fleet-card-navy p-6 relative overflow-hidden">
        {/* Subtle decorative background graphic */}
        <div className="absolute right-0 top-0 bottom-0 w-96 opacity-10 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-400 via-transparent to-transparent" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sky-300 text-xs font-semibold tracking-wide uppercase">
              <span className="flex h-2 w-2 rounded-full bg-sky-400 animate-ping" />
              <span>Real-Time Fleet Operations Command</span>
              <span>•</span>
              <span className="text-slate-400 font-normal">{currentDateFormatted}</span>
            </div>

            <h2 className="text-2xl font-extrabold text-white mt-1 tracking-tight">
              Commercial Fleet Telemetry & Logistics
            </h2>

            <p className="text-xs text-sky-100/80 mt-1 max-w-2xl leading-relaxed">
              Monitoring active transport units, automated predictive maintenance cycles, insurance
              compliance limits, and fuel telemetry across Midwest distribution corridors.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
            <button
              onClick={() => setIsAddVehicleOpen(true)}
              className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-sky-500/20 transition-all flex items-center gap-1.5"
            >
              <span>+ Register Vehicle</span>
            </button>
          </div>
        </div>
      </div>

      {/* 1. Summary Cards Row */}
      <SummaryCards />

      {/* 2. Professional Analytics Section */}
      <AnalyticsSection />

      {/* 3. Operational Activity & Reminders Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Vehicle Activity Table (2 Cols on lg) */}
        <div className="lg:col-span-2">
          <RecentActivityTable onSelectVehicle={(v) => setInspectedVehicle(v)} />
        </div>

        {/* Reminders & Compliance (1 Col on lg) */}
        <div className="lg:col-span-1">
          <RemindersCard />
        </div>
      </div>

      {/* Modals */}
      <AddVehicleModal
        isOpen={isAddVehicleOpen}
        onClose={() => setIsAddVehicleOpen(false)}
      />

      <VehicleDetailModal
        vehicle={inspectedVehicle}
        isOpen={!!inspectedVehicle}
        onClose={() => setInspectedVehicle(null)}
      />
    </div>
  );
};

export default DashboardOverview;
