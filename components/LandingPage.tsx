
import React from 'react';
import { SparklesIcon, SignalIcon, ChartBarIcon } from './Icons';

interface LandingPageProps {
  onEnterDashboard: () => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="bg-gray-800/50 backdrop-blur-md p-6 rounded-2xl border border-gray-700 transition-all duration-300 hover:border-cyan-400 hover:bg-gray-700/60 transform hover:-translate-y-1">
    <div className="text-cyan-400 mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400">{children}</p>
  </div>
);

const LandingPage: React.FC<LandingPageProps> = ({ onEnterDashboard }) => {
  return (
    <div className="min-h-screen w-full bg-gray-900 text-white overflow-hidden relative">
      {/* Animated background glows */}
      <div className="absolute top-0 -left-1/4 w-full h-full bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow-1 opacity-30"></div>
      <div className="absolute bottom-0 -right-1/4 w-full h-full bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow-2 opacity-30"></div>
      <style>{`
        @keyframes pulse-slow-1 {
          0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.3; }
          50% { transform: scale(1.2) translate(20px, -20px); opacity: 0.5; }
        }
        @keyframes pulse-slow-2 {
          0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.3; }
          50% { transform: scale(1.2) translate(-20px, 20px); opacity: 0.5; }
        }
        .animate-pulse-slow-1 { animation: pulse-slow-1 10s ease-in-out infinite; }
        .animate-pulse-slow-2 { animation: pulse-slow-2 12s ease-in-out infinite; }
      `}</style>
      
      <main className="container mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-screen text-center relative z-10">
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Real-Time Power Monitoring System for{' '}
            <span className="text-cyan-400">UNUGHA Campus</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-300">
            Advanced 3-Phase electrical panel providing live insights, trend analysis, and AI-powered recommendations for a smarter, more efficient campus.
          </p>
          <button 
            onClick={onEnterDashboard}
            className="mt-10 px-8 py-4 bg-cyan-500 text-gray-900 font-bold text-lg rounded-full shadow-lg shadow-cyan-500/20 transform transition-all duration-300 hover:bg-cyan-400 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-300"
          >
            Enter Live Dashboard
          </button>
        </div>

        <div className="mt-24 w-full max-w-5xl">
            <h2 className="text-3xl font-bold mb-8">Core Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureCard icon={<SignalIcon className="h-8 w-8"/>} title="Live Data Stream">
                    Monitor voltage, current, and power across all three phases with updates every few seconds.
                </FeatureCard>
                <FeatureCard icon={<ChartBarIcon className="h-8 w-8"/>} title="Historical Trends">
                    Analyze power consumption patterns with interactive charts to identify peak loads and anomalies.
                </FeatureCard>
                <FeatureCard icon={<SparklesIcon className="h-8 w-8"/>} title="AI Energy Advisor">
                    Get actionable insights and efficiency recommendations from our Gemini-powered AI assistant.
                </FeatureCard>
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
