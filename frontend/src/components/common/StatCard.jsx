import React from 'react';

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  badgeText,
  badgeType = 'info', // 'success', 'warning', 'danger', 'info'
  accentColor = 'navy', // 'navy', 'sky', 'emerald', 'amber', 'rose'
  breakdown = [],
  onClick,
}) => {
  const accentClasses = {
    navy: {
      iconBg: 'bg-slate-900 text-sky-400',
      borderHover: 'hover:border-slate-800',
      glow: 'shadow-slate-900/5',
    },
    sky: {
      iconBg: 'bg-sky-50 text-sky-600',
      borderHover: 'hover:border-sky-300',
      glow: 'shadow-sky-500/5',
    },
    emerald: {
      iconBg: 'bg-emerald-50 text-emerald-600',
      borderHover: 'hover:border-emerald-300',
      glow: 'shadow-emerald-500/5',
    },
    amber: {
      iconBg: 'bg-amber-50 text-amber-600',
      borderHover: 'hover:border-amber-300',
      glow: 'shadow-amber-500/5',
    },
    rose: {
      iconBg: 'bg-rose-50 text-rose-600',
      borderHover: 'hover:border-rose-300',
      glow: 'shadow-rose-500/5',
    },
  };

  const badgeClasses = {
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
    info: 'bg-sky-50 text-sky-700 border-sky-200',
  };

  const currentAccent = accentClasses[accentColor] || accentClasses.navy;

  return (
    <div
      onClick={onClick}
      className={`fleet-card p-5 cursor-pointer relative overflow-hidden group ${currentAccent.borderHover} ${currentAccent.glow}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-slate-500">
            {title}
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-slate-900">
              {value}
            </span>
            {badgeText && (
              <span
                className={`inline-flex items-center text-xs px-2 py-0.5 rounded-full font-medium border ${badgeClasses[badgeType]}`}
              >
                {badgeText}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="mt-1 text-xs text-slate-500 font-medium">
              {subtitle}
            </p>
          )}
        </div>

        <div className={`p-3 rounded-xl ${currentAccent.iconBg} transition-transform group-hover:scale-110 duration-200`}>
          {Icon && <Icon className="w-6 h-6 stroke-[2]" />}
        </div>
      </div>

      {breakdown.length > 0 && (
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          {breakdown.map((item, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${item.dotColor || 'bg-slate-300'}`} />
              <span className="text-slate-500">{item.label}:</span>
              <span className="font-semibold text-slate-800">{item.val}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatCard;
