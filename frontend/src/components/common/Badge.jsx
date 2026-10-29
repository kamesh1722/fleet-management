import React from 'react';

const BADGE_STYLES = {
  // Vehicle / Fleet Status
  Active: 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/10',
  'In Transit': 'bg-sky-50 text-sky-700 border-sky-200 ring-sky-500/10',
  Available: 'bg-indigo-50 text-indigo-700 border-indigo-200 ring-indigo-500/10',
  'In Maintenance': 'bg-amber-50 text-amber-700 border-amber-200 ring-amber-500/10',
  'Out of Service': 'bg-rose-50 text-rose-700 border-rose-200 ring-rose-500/10',

  // Health Status
  Optimal: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Good: 'bg-teal-50 text-teal-700 border-teal-200',
  Warning: 'bg-amber-50 text-amber-700 border-amber-200',
  Critical: 'bg-rose-50 text-rose-700 border-rose-200',

  // Priority
  Urgent: 'bg-rose-100 text-rose-800 border-rose-300 font-semibold',
  High: 'bg-orange-100 text-orange-800 border-orange-200',
  Medium: 'bg-blue-50 text-blue-700 border-blue-200',
  Low: 'bg-slate-100 text-slate-700 border-slate-200',

  // Maintenance Status
  Scheduled: 'bg-blue-50 text-blue-700 border-blue-200',
  'In Progress': 'bg-amber-50 text-amber-700 border-amber-200',
  Completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Overdue: 'bg-rose-100 text-rose-700 border-rose-300 font-semibold',

  // Insurance Status
  'Expiring Soon': 'bg-amber-50 text-amber-800 border-amber-300 font-medium',
  Expired: 'bg-rose-100 text-rose-700 border-rose-200',
  Renewed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

const DOT_COLORS = {
  Active: 'bg-emerald-500',
  'In Transit': 'bg-sky-500 animate-pulse',
  Available: 'bg-indigo-500',
  'In Maintenance': 'bg-amber-500',
  'Out of Service': 'bg-rose-500',
  Optimal: 'bg-emerald-500',
  Good: 'bg-teal-500',
  Warning: 'bg-amber-500',
  Critical: 'bg-rose-500 animate-ping',
  Urgent: 'bg-rose-600',
  Scheduled: 'bg-blue-500',
  'In Progress': 'bg-amber-500',
  Completed: 'bg-emerald-500',
  Overdue: 'bg-rose-600',
};

export const Badge = ({ status, text, withDot = true, className = '', size = 'md' }) => {
  const displayText = text || status;
  const styleClass = BADGE_STYLES[status] || 'bg-slate-100 text-slate-700 border-slate-200';
  const dotColor = DOT_COLORS[status] || 'bg-slate-400';

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${sizeClasses[size] || sizeClasses.md} ${styleClass} ${className}`}
    >
      {withDot && <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />}
      {displayText}
    </span>
  );
};

export default Badge;
