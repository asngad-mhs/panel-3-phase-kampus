
import React from 'react';

interface GaugeProps {
  value: number;
  min: number;
  max: number;
  label: string;
  unit: string;
  color?: string;
}

const Gauge: React.FC<GaugeProps> = ({ value, min, max, label, unit, color = '#34D399' }) => {
  const range = max - min;
  const percentage = Math.max(0, Math.min(100, ((value - min) / range) * 100));
  const angle = (percentage / 100) * 180;
  
  const strokeWidth = 10;
  const radius = 50;
  const circumference = radius * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * (circumference / 2);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-40 h-20">
        <svg className="w-full h-full" viewBox="0 0 120 60">
          {/* Background Arc */}
          <path
            d="M 10 50 A 50 50 0 0 1 110 50"
            fill="none"
            stroke="#4b5563"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Foreground Arc */}
          <path
            d="M 10 50 A 50 50 0 0 1 110 50"
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            style={{
              strokeDasharray: `${circumference / 2} ${circumference}`,
              strokeDashoffset: strokeDashoffset,
              transition: 'stroke-dashoffset 0.5s ease-in-out',
            }}
          />
        </svg>
        <div className="absolute bottom-0 w-full text-center">
          <span className="text-2xl font-bold text-white">{value.toFixed(1)}</span>
          <span className="text-sm text-gray-400 ml-1">{unit}</span>
        </div>
      </div>
      <p className="text-sm text-gray-300 mt-1">{label}</p>
    </div>
  );
};

export default Gauge;
