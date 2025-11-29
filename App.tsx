
import React, { useState, useEffect, useCallback } from 'react';
import { PhaseData, HistoricalDataPoint } from './types';
import Header from './components/Header';
import DashboardCard from './components/DashboardCard';
import PhaseCard from './components/PhaseCard';
import PowerChart from './components/PowerChart';
import AIEnergyAdvisor from './components/AIEnergyAdvisor';
import { BoltIcon, ZapIcon, BarChartIcon } from './components/Icons';
import LandingPage from './components/LandingPage';
import SystemStatus from './components/SystemStatus';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');

  const [phaseData, setPhaseData] = useState<PhaseData[]>([
    { name: 'R', voltage: 220, current: 15, power: 3.3, powerFactor: 0.95, status: 'normal' },
    { name: 'S', voltage: 221, current: 14.5, power: 3.2, powerFactor: 0.94, status: 'normal' },
    { name: 'T', voltage: 219, current: 15.2, power: 3.3, powerFactor: 0.96, status: 'normal' },
  ]);

  const [historicalData, setHistoricalData] = useState<HistoricalDataPoint[]>([]);

  const generateInitialHistoricalData = () => {
    const data: HistoricalDataPoint[] = [];
    const now = new Date();
    for (let i = 10; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 5000);
      data.push({
        time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        R: 3.3 + (Math.random() - 0.5) * 0.5,
        S: 3.2 + (Math.random() - 0.5) * 0.5,
        T: 3.3 + (Math.random() - 0.5) * 0.5,
      });
    }
    return data;
  };

  const updateData = useCallback(() => {
    setPhaseData(prevData =>
      prevData.map(phase => {
        const voltageFluctuation = (Math.random() - 0.5) * 4; // Increased fluctuation
        const currentFluctuation = (Math.random() - 0.5) * 1.5;
        let newVoltage = parseFloat((phase.voltage + voltageFluctuation).toFixed(1));
        if (newVoltage < 190) newVoltage = 190;
        if (newVoltage > 250) newVoltage = 250;

        const newCurrent = parseFloat((phase.current + currentFluctuation).toFixed(1));
        const newPower = parseFloat(((newVoltage * newCurrent * phase.powerFactor) / 1000).toFixed(2));
        
        let status: 'normal' | 'warning' | 'critical' = 'normal';
        if (newVoltage > 245 || newVoltage < 195) {
            status = 'critical';
        } else if (newVoltage > 235 || newVoltage < 205) {
            status = 'warning';
        }

        return {
          ...phase,
          voltage: newVoltage,
          current: newCurrent,
          power: newPower,
          status: status,
        };
      })
    );

    setHistoricalData(prevData => {
        const now = new Date();
        const latestPoint: HistoricalDataPoint = {
            time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            R: phaseData[0].power,
            S: phaseData[1].power,
            T: phaseData[2].power,
        };
        const newData = [...prevData, latestPoint];
        if (newData.length > 20) {
            newData.shift();
        }
        return newData;
    });
  }, [phaseData]);
  
  useEffect(() => {
    setHistoricalData(generateInitialHistoricalData());
    const interval = setInterval(updateData, 3000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalPower = phaseData.reduce((acc, phase) => acc + phase.power, 0).toFixed(2);
  const avgVoltage = (phaseData.reduce((acc, phase) => acc + phase.voltage, 0) / phaseData.length).toFixed(1);
  const totalCurrent = phaseData.reduce((acc, phase) => acc + phase.current, 0).toFixed(1);

  const handleDownloadReport = () => {
    const reportData = {
      timestamp: new Date().toISOString(),
      totalPower: `${totalPower} kW`,
      averageVoltage: `${avgVoltage} V`,
      totalCurrent: `${totalCurrent} A`,
      phaseDetails: phaseData,
      historicalData: historicalData.slice(-10),
    };
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `unugha_power_report_${new Date().getTime()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (view === 'landing') {
    return <LandingPage onEnterDashboard={() => setView('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6 lg:p-8 selection:bg-cyan-500 selection:text-gray-900">
      <Header onGoHome={() => setView('landing')} onDownloadReport={handleDownloadReport} />
      <main className="mt-8">
        {/* Top-level Stats */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <SystemStatus phaseData={phaseData} />
          <DashboardCard title="Total Power" value={totalPower} unit="kW" icon={<BoltIcon />} />
          <DashboardCard title="Average Voltage" value={avgVoltage} unit="V" icon={<ZapIcon />} />
          <DashboardCard title="Total Current" value={totalCurrent} unit="A" icon={<BarChartIcon />} />
        </div>

        {/* Phase Details */}
        <div className="mt-8">
            <h2 className="text-2xl font-semibold text-cyan-300 mb-4">Phase Live Status</h2>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {phaseData.map(phase => (
                    <PhaseCard key={phase.name} data={phase} />
                ))}
            </div>
        </div>

        {/* Charts and AI */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
                <h2 className="text-2xl font-semibold text-cyan-300 mb-4">Power Consumption Trend (kW)</h2>
                <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-700 h-96">
                    <PowerChart data={historicalData} />
                </div>
            </div>
            <div className="lg:col-span-1">
                <h2 className="text-2xl font-semibold text-cyan-300 mb-4">AI Energy Advisor</h2>
                 <AIEnergyAdvisor phaseData={phaseData} />
            </div>
        </div>
      </main>
    </div>
  );
};

export default App;
