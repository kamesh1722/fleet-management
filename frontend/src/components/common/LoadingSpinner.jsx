import React from 'react';

export const LoadingSpinner = ({ text = 'Loading fleet telemetry...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="relative w-12 h-12">
        <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-sky-600 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-slate-900 rounded-full" />
        </div>
      </div>
      {text && <p className="mt-4 text-sm font-medium text-slate-500 animate-pulse">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
