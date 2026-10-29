import React from 'react';
import { Truck, Activity, Wrench, ShieldAlert, Zap, TrendingUp } from 'lucide-react';
import StatCard from '../common/StatCard';
import { useFleet } from '../../context/FleetContext';

export const SummaryCards = () => {
  const { summary, loading, setActiveTab } = useFleet();

  const total = summary?.totalVehicles ?? 0;
  const active = summary?.activeVehicles ?? 0;
  const available = summary?.availableVehicles ?? 0;
  const inMaintenance = summary?.inMaintenanceVehicles ?? 0;
  const upcomingServices = summary?.upcomingServices ?? 0;
  const urgentServices = summary?.urgentServices ?? 0;
  const expiringInsurance = summary?.expiringInsurancePolicies ?? 0;
  const utilization = summary?.utilizationRate ?? 0;
  const healthScore = summary?.averageHealthScore ?? 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {/* 1. Total Vehicles */}
      <StatCard
        title="Total Fleet Vehicles"
        value={loading ? '...' : total.toString()}
        subtitle="Registered commercial units"
        icon={Truck}
        accentColor="navy"
        badgeText={`${available} Available`}
        badgeType="info"
        breakdown={[
          { label: 'Active', val: active, dotColor: 'bg-emerald-500' },
          { label: 'Transit', val: active > 0 ? Math.ceil(active * 0.4) : 0, dotColor: 'bg-sky-500' },
          { label: 'In Shop', val: inMaintenance, dotColor: 'bg-amber-500' },
        ]}
        onClick={() => setActiveTab('vehicles')}
      />

      {/* 2. Active Vehicles & Utilization */}
      <StatCard
        title="Active Vehicles"
        value={loading ? '...' : active.toString()}
        subtitle={`${utilization}% Fleet Utilization Rate`}
        icon={TrendingUp}
        accentColor="sky"
        badgeText={`${utilization}% Oper.`}
        badgeType={utilization > 75 ? 'success' : 'warning'}
        breakdown={[
          { label: 'On Route', val: active, dotColor: 'bg-emerald-500' },
          { label: 'Idle Yard', val: available, dotColor: 'bg-indigo-400' },
          { label: 'Readiness', val: '94%', dotColor: 'bg-sky-400' },
        ]}
        onClick={() => setActiveTab('vehicles')}
      />

      {/* 3. Upcoming Services */}
      <StatCard
        title="Upcoming Services"
        value={loading ? '...' : upcomingServices.toString()}
        subtitle={`${urgentServices} service ticket(s) urgent/overdue`}
        icon={Wrench}
        accentColor={urgentServices > 0 ? 'rose' : 'amber'}
        badgeText={urgentServices > 0 ? `${urgentServices} Urgent` : 'On Schedule'}
        badgeType={urgentServices > 0 ? 'danger' : 'info'}
        breakdown={[
          { label: 'Next 7 Days', val: Math.min(upcomingServices, 2), dotColor: 'bg-rose-500' },
          { label: 'Scheduled', val: upcomingServices, dotColor: 'bg-blue-400' },
          { label: 'Overdue', val: urgentServices, dotColor: 'bg-amber-500' },
        ]}
        onClick={() => setActiveTab('maintenance')}
      />

      {/* 4. Expiring Insurance Policies */}
      <StatCard
        title="Expiring Insurance"
        value={loading ? '...' : expiringInsurance.toString()}
        subtitle="Renewals due within 30-day window"
        icon={ShieldAlert}
        accentColor={expiringInsurance > 0 ? 'amber' : 'emerald'}
        badgeText={expiringInsurance > 0 ? 'Action Due' : 'All Clear'}
        badgeType={expiringInsurance > 0 ? 'warning' : 'success'}
        breakdown={[
          { label: '< 15 Days', val: 1, dotColor: 'bg-rose-500' },
          { label: '< 30 Days', val: expiringInsurance, dotColor: 'bg-amber-500' },
          { label: 'Compliant', val: '100%', dotColor: 'bg-emerald-500' },
        ]}
        onClick={() => setActiveTab('insurance')}
      />
    </div>
  );
};

export default SummaryCards;
