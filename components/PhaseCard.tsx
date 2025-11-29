
import React from 'react';
import type { PhaseData } from '../types';
import { AlertTriangleIcon, CheckCircleIcon } from './Icons';
import Gauge from './Gauge';

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
  const gaugeColor = {
    green: '#34D399',
    yellow: '#FBBF24',
    red: '#F87171',
  }[currentStatus.color];

  const textColorClass = {
    green: 'text-green-400',
    yellow: 'text-yellow-400',
    red: 'text-red-400',
  }[currentStatus.color];

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-700 transition-all duration-300 hover:border-cyan-400 flex flex-col justify-between">
      <div className="flex justify-between items-center mb-4">
        <div className={`flex items-center justify-center w-16 h-16 rounded-full bg-gray-900 ring-4 ${ringColorClass} transition-all duration-300`}>
            <span className="text-3xl font-bold text-white">{data.name}</span>
        </div>
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full bg-gray-900 ${textColorClass} transition-colors duration-300`}>
            {currentStatus.icon}
            <span className="font-semibold text-sm">{currentStatus.text}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 my-4">
        <Gauge value={data.voltage} min={180} max={260} label="Voltage" unit="V" color={gaugeColor} />
        <Gauge value={data.current} min={0} max={30} label="Current" unit="A" color="#67e8f9" />
      </div>

      <div className="space-y-2 mt-4 border-t border-gray-700 pt-4">
        <div className="flex justify-between items-baseline">
            <span className="text-gray-400 text-sm">Power</span>
            <span className="font-mono text-lg font-bold text-white">{data.power.toFixed(2)} kW</span>
        </div>
        <div className="flex justify-between items-baseline">
            <span className="text-gray-400 text-sm">Power Factor</span>
            <span className="font-mono text-lg font-bold text-white">{data.powerFactor.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default PhaseCard;
