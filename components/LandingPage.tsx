
import React from 'react';
import { BuildingOfficeIcon } from './Icons';
import type { PhaseData } from '../types';

interface BuildingState {
    phaseData: PhaseData[];
}

interface LandingPageProps {
  buildingData: Record<string, BuildingState>;
  onEnterDashboard: (buildingName: string) => void;
}

const getOverallStatus = (phases: PhaseData[]): 'normal' | 'warning' | 'critical' => {
    if (phases.some(p => p.status === 'critical')) return 'critical';
    if (phases.some(p => p.status === 'warning')) return 'warning';
    return 'normal';
};

const BuildingCard: React.FC<{ name: string; status: 'normal' | 'warning' | 'critical'; onSelect: () => void; }> = ({ name, status, onSelect }) => {
    const statusConfig = {
        normal: {
            text: 'Operational',
            bg: 'bg-green-500/10',
            border: 'border-green-500/50',
            dot: 'bg-green-400',
        },
        warning: {
            text: 'Warning',
            bg: 'bg-yellow-500/10',
            border: 'border-yellow-500/50',
            dot: 'bg-yellow-400 animate-pulse',
        },
        critical: {
            text: 'Critical Alert',
            bg: 'bg-red-500/10',
            border: 'border-red-500/50',
            dot: 'bg-red-400 animate-pulse',
        }
    };
    const currentStatus = statusConfig[status];

    return (
        <div className={`bg-gray-800/50 backdrop-blur-md p-6 rounded-2xl border ${currentStatus.border} transition-all duration-300 hover:border-cyan-400 hover:bg-gray-700/60 transform hover:-translate-y-1 flex flex-col`}>
            <div className="flex-grow">
                <div className="flex items-center gap-4">
                    <BuildingOfficeIcon className="h-8 w-8 text-cyan-400" />
                    <h3 className="text-2xl font-bold text-white">{name}</h3>
                </div>
                <div className="mt-4 flex items-center gap-2">
                    <span className="text-gray-400">Status:</span>
                    <div className={`flex items-center gap-2 font-semibold ${currentStatus.text}`}>
                        <div className={`w-2 h-2 rounded-full ${currentStatus.dot}`}></div>
                        <span>{currentStatus.text}</span>
                    </div>
                </div>
            </div>
            <button
                onClick={onSelect}
                className="mt-6 w-full px-4 py-2 bg-cyan-500 text-gray-900 font-bold rounded-lg shadow-md shadow-cyan-500/20 transform transition-all duration-300 hover:bg-cyan-400 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-300"
            >
                View Dashboard
            </button>
        </div>
    );
};

const LandingPage: React.FC<LandingPageProps> = ({ buildingData, onEnterDashboard }) => {
  return (
    <div className="min-h-screen w-full bg-gray-900 text-white overflow-hidden relative">
      {/* Animated background glows */}
      <div className="absolute top-0 -left-1/4 w-full h-full bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow-1 opacity-30"></div>
      <div className="absolute bottom-0 -right-1/4 w-full h-full bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow-2 opacity-30"></div>
      <style>{`
        @keyframes pulse-slow-1 { 0%, 100% { transform: scale(1) translate(0, 0); } 50% { transform: scale(1.2) translate(20px, -20px); } }
        @keyframes pulse-slow-2 { 0%, 100% { transform: scale(1) translate(0, 0); } 50% { transform: scale(1.2) translate(-20px, 20px); } }
        .animate-pulse-slow-1 { animation: pulse-slow-1 10s ease-in-out infinite; }
        .animate-pulse-slow-2 { animation: pulse-slow-2 12s ease-in-out infinite; }
      `}</style>
      
      <main className="container mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-screen text-center relative z-10">
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Multi-Building Power Monitoring
            <span className="block text-cyan-400 mt-2">UNUGHA Campus</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-300">
            Select a building to view its real-time 3-phase electrical panel, analyze trends, and get AI-powered energy insights.
          </p>
        </div>

        <div className="mt-16 w-full max-w-5xl">
            <h2 className="text-3xl font-bold mb-8">Campus Building Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {Object.keys(buildingData).map(name => (
                    <BuildingCard
                        key={name}
                        name={name}
                        status={getOverallStatus(buildingData[name].phaseData)}
                        onSelect={() => onEnterDashboard(name)}
                    />
                ))}
            </div>
        </div>
      </main>

      <footer className="absolute bottom-0 left-0 right-0 p-6 text-center text-gray-500 z-10">
        <p>&copy; {new Date().getFullYear()} Universitas Nahdlatul Ulama Al Ghazali (UNUGHA). All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
