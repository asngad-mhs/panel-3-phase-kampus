import React, { useEffect, useState, useRef } from 'react';

interface DashboardCardProps {
  title: string;
  value: string;
  unit: string;
  icon: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, unit, icon }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  // FIX: When initializing `useRef` without an argument, its `current` property is `undefined`.
  // The type must be `string | undefined` to reflect this, resolving the TypeScript error.
  const prevValueRef = useRef<string | undefined>();

  useEffect(() => {
    if (prevValueRef.current !== undefined && prevValueRef.current !== value) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 500); // Animation duration
      return () => clearTimeout(timer);
    }
    prevValueRef.current = value;
  }, [value]);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-700 flex items-center space-x-4 transition-all duration-300 hover:bg-gray-700/60 hover:border-cyan-400">
      <div className="bg-gray-900 p-4 rounded-full text-cyan-400">
        {icon}
      </div>
      <div>
        <p className="text-gray-400 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold text-white transition-all duration-500" style={isAnimating ? { textShadow: '0 0 12px #22d3ee' } : {}}>
          {value} <span className="text-xl text-gray-300">{unit}</span>
        </p>
      </div>
    </div>
  );
};

export default DashboardCard;
