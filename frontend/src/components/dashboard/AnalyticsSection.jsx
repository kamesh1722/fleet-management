import React, { useState } from 'react';
import {
  BarChart3,
  TrendingDown,
  TrendingUp,
  DollarSign,
  Fuel,
  Wrench,
  ShieldCheck,
  Zap,
  Info,
} from 'lucide-react';
import { useFleet } from '../../context/FleetContext';

export const AnalyticsSection = () => {
  const { analytics, summary } = useFleet();
  const [metricTab, setMetricTab] = useState('costs'); // 'costs' | 'utilization'

  const costTrend = analytics?.costTrend || [
    { month: 'May', fuelCost: 18450, maintenanceCost: 8900, operationalCost: 27350 },
    { month: 'Jun', fuelCost: 19800, maintenanceCost: 11200, operationalCost: 31000 },
    { month: 'Jul', fuelCost: 21300, maintenanceCost: 7600, operationalCost: 28900 },
    { month: 'Aug', fuelCost: 20100, maintenanceCost: 13400, operationalCost: 33500 },
    { month: 'Sep', fuelCost: 22600, maintenanceCost: 9800, operationalCost: 32400 },
    { month: 'Oct', fuelCost: 23400, maintenanceCost: 10450, operationalCost: 33850 },
  ];

  const maxCost = Math.max(...costTrend.map((d) => d.operationalCost), 35000);

  // Health breakdown from summary
  const healthData = summary?.healthBreakdown || {
    Optimal: 5,
    Good: 2,
    Warning: 2,
    Critical: 1,
  };
  const totalHealth = Object.values(healthData).reduce((a, b) => a + b, 0) || 10;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 1. Main Operational Cost Analytics (2 Columns wide) */}
      <div className="lg:col-span-2 fleet-card p-6 flex flex-col justify-between">
        <div>
          {/* Header & Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-sky-50 text-sky-600 rounded-lg">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    Fleet Cost & Operational Analytics
                  </h3>
                  <p className="text-xs text-slate-500">
                    6-Month expense trend: Fuel expenditure vs Maintenance & repairs
                  </p>
                </div>
              </div>
            </div>

            {/* Metric pill toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold self-start sm:self-auto">
              <button
                onClick={() => setMetricTab('costs')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  metricTab === 'costs'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Cost Trajectory
              </button>
              <button
                onClick={() => setMetricTab('breakdown')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  metricTab === 'breakdown'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Category Split
              </button>
            </div>
          </div>

          {/* Metric Highlights Banner */}
          <div className="grid grid-cols-3 gap-4 my-5 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs">
            <div>
              <span className="text-slate-400 font-medium">October Total Spend</span>
              <div className="text-lg font-bold text-slate-900 mt-0.5">₹33,850</div>
              <span className="text-emerald-600 font-semibold flex items-center gap-0.5 mt-0.5">
                <TrendingDown className="w-3.5 h-3.5" /> -2.4% vs forecast
              </span>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Avg Fuel Cost / km</span>
              <div className="text-lg font-bold text-slate-900 mt-0.5">₹0.42</div>
              <span className="text-slate-500 font-medium">9.2 mpg fleet avg</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Preventive vs Unscheduled</span>
              <div className="text-lg font-bold text-sky-700 mt-0.5">78% : 22%</div>
              <span className="text-emerald-600 font-semibold">Healthy ratio</span>
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="pt-2">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Operational Expense (₹ INR)</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-sky-500" />
                  <span className="text-slate-600 font-medium">Fuel Expense</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-slate-800" />
                  <span className="text-slate-600 font-medium">Maintenance & Parts</span>
                </div>
              </div>
            </div>

            {/* Bars container */}
            <div className="h-48 flex items-end justify-between gap-3 sm:gap-6 pt-4 px-2">
              {costTrend.map((item, idx) => {
                const fuelHeight = (item.fuelCost / maxCost) * 100;
                const maintHeight = (item.maintenanceCost / maxCost) * 100;

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="w-full max-w-[48px] h-38 flex items-end justify-center gap-1">
                      {/* Fuel Bar */}
                      <div
                        style={{ height: `${fuelHeight}%` }}
                        className="w-1/2 bg-sky-500 hover:bg-sky-400 rounded-t transition-all relative group/bar cursor-pointer"
                      >
                        <div className="opacity-0 group-hover/bar:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-1 px-1.5 rounded pointer-events-none whitespace-nowrap z-20 shadow-md">
                          Fuel: ₹${(item.fuelCost / 1000).toFixed(1)}k
                        </div>
                      </div>

                      {/* Maintenance Bar */}
                      <div
                        style={{ height: `${maintHeight}%` }}
                        className="w-1/2 bg-slate-800 hover:bg-slate-700 rounded-t transition-all relative group/bar cursor-pointer"
                      >
                        <div className="opacity-0 group-hover/bar:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-1 px-1.5 rounded pointer-events-none whitespace-nowrap z-20 shadow-md">
                          Maint: ₹${(item.maintenanceCost / 1000).toFixed(1)}k
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-900">
                      {item.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer info note */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-slate-400" />
            Connected directly to Mongoose expense aggregation pipeline
          </span>
          <span className="font-semibold text-slate-700">Updated today</span>
        </div>
      </div>

      {/* 2. Fleet Health & Status Index (1 Column wide) */}
      <div className="fleet-card p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-base text-slate-900">Fleet Health Index</h3>
              <p className="text-xs text-slate-500">Real-time ECU & diagnostic metrics</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
              {summary?.averageHealthScore || 94}%
            </div>
          </div>

          {/* Health Distribution Progress Bars */}
          <div className="space-y-4 my-5">
            <div>
              <div className="flex justify-between text-xs font-medium mb-1.5">
                <span className="text-slate-600 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  Optimal Health (90-100%)
                </span>
                <span className="font-bold text-slate-900">{healthData.Optimal} units</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  style={{ width: `${(healthData.Optimal / totalHealth) * 100}%` }}
                  className="h-full bg-emerald-500 rounded-full"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1.5">
                <span className="text-slate-600 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
                  Good Standing (80-89%)
                </span>
                <span className="font-bold text-slate-900">{healthData.Good} units</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  style={{ width: `${(healthData.Good / totalHealth) * 100}%` }}
                  className="h-full bg-teal-400 rounded-full"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1.5">
                <span className="text-slate-600 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  Service Warning (60-79%)
                </span>
                <span className="font-bold text-slate-900">{healthData.Warning} units</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  style={{ width: `${(healthData.Warning / totalHealth) * 100}%` }}
                  className="h-full bg-amber-400 rounded-full"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1.5">
                <span className="text-slate-600 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  Critical Fault (&lt; 60%)
                </span>
                <span className="font-bold text-rose-600">{healthData.Critical} units</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  style={{ width: `${(healthData.Critical / totalHealth) * 100}%` }}
                  className="h-full bg-rose-500 rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Quick telemetry overview card */}
          <div className="p-3.5 bg-slate-900 rounded-xl text-white text-xs space-y-2">
            <div className="flex justify-between text-slate-400">
              <span>Powertrain Telemetry</span>
              <span className="text-emerald-400 font-mono">99.8% Online</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Avg Battery / Tank Level</span>
              <span className="text-sky-300 font-mono">72.4% Avg</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Active DTC Codes</span>
              <span className="text-rose-400 font-mono">1 Code (FLT-108)</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 flex justify-between">
          <span>Target Score: 95%+</span>
          <span className="text-sky-600 font-semibold cursor-pointer hover:underline">
            View Telemetry Specs
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSection;
