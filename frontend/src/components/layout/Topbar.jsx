import React, { useState } from 'react';
import {
  Menu,
  Search,
  Bell,
  Plus,
  RefreshCw,
  SlidersHorizontal,
  Shield,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
} from 'lucide-react';
import { useFleet } from '../../context/FleetContext';

export const Topbar = () => {
  const {
    isSidebarOpen,
    setIsSidebarOpen,
    setIsMobileSidebarOpen,
    searchQuery,
    setSearchQuery,
    refreshData,
    loading,
    lastRefreshed,
    setIsAddVehicleOpen,
    reminders,
    activeTab,
  } = useFleet();

  const [isAlertsOpen, setIsAlertsOpen] = useState(false);

  const activeAlertsCount =
    (reminders?.criticalAlerts?.length || 0) +
    (reminders?.upcomingServices?.filter((s) => s.priority === 'Urgent').length || 0);

  const moduleTitles = {
    dashboard: 'Fleet Telemetry Dashboard',
    vehicles: 'Vehicle Fleet Directory',
    maintenance: 'Maintenance & Service Scheduling',
    insurance: 'Insurance Policies & Compliance',
    fuel: 'Fuel Logistics & Operating Costs',
    health: 'Vehicle Health & Telemetry Sensors',
    alerts: 'Operational Alerts & Notifications',
    reports: 'Fleet Analytics & Strategic Reports',
  };

  return (
    <header className="sticky top-0 z-30 h-18 bg-white border-b border-slate-200/90 shadow-xs">
      <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left Side: Toggle button & Module Breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (window.innerWidth < 1024) {
                setIsMobileSidebarOpen(true);
              } else {
                setIsSidebarOpen(!isSidebarOpen);
              }
            }}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="text-[11px] font-semibold tracking-wider uppercase text-sky-600 flex items-center gap-1.5">
              <span>Apex Enterprise</span>
              <span className="text-slate-300">•</span>
              <span>Midwest Region</span>
            </div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight">
              {moduleTitles[activeTab] || 'Dashboard Overview'}
            </h1>
          </div>
        </div>

        {/* Center: Search input */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search vehicles by ID, plate, VIN, model, driver..."
              className="w-full pl-10 pr-12 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-slate-800 placeholder-slate-400"
            />
            <kbd className="hidden sm:inline-block absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-slate-200/60 border border-slate-300 rounded-md">
              Ctrl K
            </kbd>
          </div>
        </div>

        {/* Right Side: Refresh, Add Vehicle, Alerts, User Avatar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Refresh button */}
          <button
            onClick={refreshData}
            disabled={loading}
            title={`Last updated: ${lastRefreshed ? new Date(lastRefreshed).toLocaleTimeString() : 'Just now'}`}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-sky-600' : ''}`} />
          </button>

          {/* Quick Action: Add Vehicle */}
          <button
            onClick={() => setIsAddVehicleOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-all hover:shadow-md hover:scale-[1.02] active:scale-95"
          >
            <Plus className="w-4 h-4 text-sky-400 stroke-[2.5]" />
            <span className="hidden sm:inline">Add Vehicle</span>
          </button>

          {/* Notification dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsAlertsOpen(!isAlertsOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors relative"
              title="Alert Notifications"
            >
              <Bell className="w-5 h-5" />
              {activeAlertsCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-white">
                  {activeAlertsCount}
                </span>
              )}
            </button>

            {/* Notification popup menu */}
            {isAlertsOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsAlertsOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 p-4 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="font-bold text-sm text-slate-900">
                      Fleet Alerts & Reminders
                    </span>
                    <span className="text-xs text-sky-600 font-semibold">
                      {activeAlertsCount} Unresolved
                    </span>
                  </div>

                  <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto mt-2">
                    {reminders?.criticalAlerts && reminders.criticalAlerts.length > 0 ? (
                      reminders.criticalAlerts.map((alert) => (
                        <div key={alert._id} className="py-2.5 text-xs">
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                            <div>
                              <p className="font-semibold text-slate-800">{alert.title}</p>
                              <p className="text-slate-500 mt-0.5 text-[11px]">{alert.message}</p>
                              <span className="text-[10px] text-slate-400 mt-1 block">
                                Vehicle: {alert.vehicleCode}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-6 text-center text-xs text-slate-500">
                        No critical alerts reported at this time.
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User profile capsule */}
          <div className="flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-slate-200">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-slate-900 to-sky-800 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              A
            </div>
            <div className="hidden xl:block text-left">
              <div className="text-xs font-bold text-slate-800">Admin</div>
              <div className="text-[11px] text-slate-400 font-medium">Fleet Administrator</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
