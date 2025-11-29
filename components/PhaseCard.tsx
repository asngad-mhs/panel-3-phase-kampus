
import React from 'react';
import type { PhaseData } from '../types';
import { AlertTriangleIcon, CheckCircleIcon, ZapIcon } from './Icons';

interface PhaseCardProps {
  data: PhaseData;
}

const PhaseCard: React.FC<PhaseCardProps> = ({ data }) => {
  const statusConfig = {
    normal: {
      color: 'green',
      icon: <CheckCircleIcon />,
      text: 'Normal',
    },
    warning: {
      color: 'yellow',
      icon: <AlertTriangleIcon />,
      text: 'Warning',
    },
    critical: {
      color: 'red',
      icon: <AlertTriangleIcon />,
      text: 'Critical',
    },
  };

  const currentStatus = statusConfig[data.status];
  const ringColorClass = {
    green: 'ring-green-500',
    yellow: 'ring-yellow-500',
    red: 'ring-red-500',
  }[currentStatus.color];

  const textColorClass = {
    green: 'text-green-400',
    yellow: 'text-yellow-400',
    red: 'text-red-400',
  }[currentStatus.color];

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-700 transition-all duration-300 hover:border-cyan-400">
      <div className="flex justify-between items-center mb-4">
        <div className={`flex items-center justify-center w-16 h-16 rounded-full bg-gray-900 ring-4 ${ringColorClass}`}>
            <span className="text-3xl font-bold text-white">{data.name}</span>
        </div>
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full bg-gray-900 ${textColorClass}`}>
            {currentStatus.icon}
            <span className="font-semibold text-sm">{currentStatus.text}</span>
        </div>
      </div>
      
      <div className="space-y-3 mt-6">
        <div className="flex justify-between items-baseline">
            <span className="text-gray-400">Voltage</span>
            <span className="font-mono text-xl font-bold text-white">{data.voltage.toFixed(1)} V</span>
        </div>
        <div className="flex justify-between items-baseline">
            <span className="text-gray-400">Current</span>
            <span className="font-mono text-xl font-bold text-white">{data.current.toFixed(1)} A</span>
        </div>
        <div className="flex justify-between items-baseline">
            <span className="text-gray-400">Power</span>
            <span className="font-mono text-xl font-bold text-white">{data.power.toFixed(2)} kW</span>
        </div>
        <div className="flex justify-between items-baseline">
            <span className="text-gray-400">Power Factor</span>
            <span className="font-mono text-xl font-bold text-white">{data.powerFactor.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default PhaseCard;
