
import React from 'react';
import { PhaseData } from '../types';
import { ShieldCheckIcon, ShieldExclamationIcon } from './Icons';

interface SystemStatusProps {
  phaseData: PhaseData[];
}

const SystemStatus: React.FC<SystemStatusProps> = ({ phaseData }) => {
  const powers = phaseData.map(p => p.power);
  const maxPower = Math.max(...powers);
  const minPower = Math.min(...powers);
  const imbalance = maxPower > 0 ? ((maxPower - minPower) / maxPower) * 100 : 0;

  let overallStatus: 'operational' | 'warning' | 'critical' = 'operational';
  let statusText = 'All Systems Operational';
  let statusColor = 'text-green-400';
  let icon = <ShieldCheckIcon />;

  if (imbalance > 20) {
    overallStatus = 'critical';
  } else if (imbalance > 10) {
    overallStatus = 'warning';
  }

  for (const phase of phaseData) {
    if (phase.status === 'critical') {
      overallStatus = 'critical';
      break;
    }
    if (phase.status === 'warning') {
      overallStatus = 'warning';
    }
  }

  if (overallStatus === 'critical') {
    statusText = 'Critical Alert';
    statusColor = 'text-red-400';
    icon = <ShieldExclamationIcon />;
  } else if (overallStatus === 'warning') {
    statusText = 'Warning Detected';
    statusColor = 'text-yellow-400';
    icon = <ShieldExclamationIcon />;
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-700 flex flex-col justify-between transition-all duration-300 hover:bg-gray-700/60 hover:border-cyan-400 lg:col-span-1 md:col-span-2">
      <div>
        <p className="text-gray-400 text-sm font-medium">System Health</p>
        <div className={`flex items-center gap-2 mt-2 ${statusColor}`}>
          {icon}
          <p className="text-2xl font-bold">{statusText}</p>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-600">
        <div className="flex justify-between items-baseline">
            <span className="text-gray-400 text-sm">Load Imbalance</span>
            <span className="font-mono text-lg font-bold text-white">{imbalance.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;
