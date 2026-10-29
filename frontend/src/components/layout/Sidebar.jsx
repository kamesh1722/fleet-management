import React from 'react';
import {
  LayoutDashboard,
  Truck,
  Wrench,
  ShieldCheck,
  Fuel,
  Activity,
  Bell,
  BarChart3,
  ChevronRight,
  Radio,
  X,
} from 'lucide-react';
import { useFleet } from '../../context/FleetContext';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
  { id: 'vehicles', label: 'Vehicle Management', icon: Truck, badge: null },
  { id: 'maintenance', label: 'Maintenance & Service', icon: Wrench, badge: 'Due' },
  { id: 'insurance', label: 'Insurance Management', icon: ShieldCheck, badge: null },
  { id: 'fuel', label: 'Fuel & Cost Control', icon: Fuel, badge: null },
  { id: 'health', label: 'Vehicle Health Monitor', icon: Activity, badge: null },
  { id: 'alerts', label: 'Alerts & Reminders', icon: Bell, badge: '3' },
  { id: 'reports', label: 'Reports & Analytics', icon: BarChart3, badge: null },
];

export const Sidebar = () => {
  const {
    activeTab,
    setActiveTab,
    isSidebarOpen,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    summary,
  } = useFleet();

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-xs lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col navy-sidebar-gradient border-r border-slate-800 text-white transition-all duration-300 ease-in-out lg:static ${
          isMobileSidebarOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0'
        } ${isSidebarOpen ? 'lg:w-68' : 'lg:w-20'}`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between h-18 px-5 border-b border-slate-800/80">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/20 shrink-0">
              <Truck className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            {(isSidebarOpen || isMobileSidebarOpen) && (
              <div className="truncate">
                <div className="font-extrabold tracking-wider text-base uppercase bg-gradient-to-r from-white via-sky-100 to-sky-300 bg-clip-text text-transparent">
                  ApexFleet
                </div>
                <div className="text-[10px] text-sky-400/80 font-medium tracking-widest uppercase">
                  Telemetry Core
                </div>
              </div>
            )}
          </div>

          {/* Mobile close button */}
          <button
            onClick={() => setIsMobileSidebarOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live System Telemetry Status Banner */}
        {(isSidebarOpen || isMobileSidebarOpen) && (
          <div className="mx-4 my-3 px-3.5 py-2 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-300 font-medium">Fleet Online</span>
            </div>
            <span className="text-[11px] text-sky-400 font-mono">
              {summary?.activeVehicles ?? '10'}/{summary?.totalVehicles ?? '10'} Active
            </span>
          </div>
        )}

        {/* Navigation Modules */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (isMobileSidebarOpen) setIsMobileSidebarOpen(false);
                }}
                title={!isSidebarOpen ? item.label : undefined}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                  isActive
                    ? 'bg-sky-500 text-slate-950 font-bold shadow-lg shadow-sky-500/25'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <Icon
                    className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-slate-950' : 'text-sky-400 group-hover:text-white'
                    }`}
                  />
                  {(isSidebarOpen || isMobileSidebarOpen) && (
                    <span className="truncate">{item.label}</span>
                  )}
                </div>

                {(isSidebarOpen || isMobileSidebarOpen) && item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive
                        ? 'bg-slate-950 text-sky-300'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Bottom Profile & System Node */}
        <div className="p-3.5 border-t border-slate-800/80 bg-slate-950/40 space-y-2.5">
          {(isSidebarOpen || isMobileSidebarOpen) ? (
            <>
              <div className="flex items-center gap-3 px-1">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-700 text-slate-950 flex items-center justify-center font-extrabold text-sm shadow-md shrink-0">
                  A
                </div>
                <div className="truncate text-xs">
                  <div className="text-white font-bold truncate">Admin</div>
                  <div className="text-sky-400 text-[11px] font-medium">Super Admin</div>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-2 border-t border-slate-800/60 text-[11px] text-slate-400 px-1">
                <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse shrink-0" />
                <span className="truncate">MongoDB 8.x • Live Sync</span>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 to-blue-700 text-slate-950 flex items-center justify-center font-extrabold text-xs shadow-md" title="Admin (Super Admin)">
                A
              </div>
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
