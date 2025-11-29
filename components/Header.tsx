
import React, { useState, useEffect } from 'react';
import { HomeIcon, DownloadIcon } from './Icons';

interface HeaderProps {
    buildingName: string;
    onGoHome: () => void;
    onDownloadReport: () => void;
}

const Header: React.FC<HeaderProps> = ({ buildingName, onGoHome, onDownloadReport }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
      <div className="flex items-center gap-4">
        <button 
            onClick={onGoHome} 
            className="bg-gray-800/50 p-3 rounded-full text-cyan-400 hover:bg-gray-700/60 hover:text-white transition-colors"
            aria-label="Go to Homepage"
        >
            <HomeIcon />
        </button>
        <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
            UNUGHA Power Monitoring
            </h1>
            <p className="text-cyan-400 mt-1 text-lg">
                Monitoring Panel: <span className="font-semibold">{buildingName}</span>
            </p>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-4 sm:mt-0">
        <button 
            onClick={onDownloadReport}
            className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-700 text-cyan-400 hover:bg-gray-700/60 hover:text-white transition-colors"
            aria-label="Download Report"
        >
            <DownloadIcon />
            <span className="hidden md:inline">Download Report</span>
        </button>
        <div className="text-right bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-700">
          <p className="text-lg font-medium text-white">{currentTime.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p className="text-2xl font-bold text-cyan-300 tracking-wider">{currentTime.toLocaleTimeString()}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
