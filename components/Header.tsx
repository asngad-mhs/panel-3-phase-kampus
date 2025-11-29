
import React, { useState, useEffect } from 'react';
import { HomeIcon } from './Icons';

interface HeaderProps {
    onGoHome?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onGoHome }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
      <div className="flex items-center gap-4">
        {onGoHome && (
            <button 
                onClick={onGoHome} 
                className="bg-gray-800/50 p-3 rounded-full text-cyan-400 hover:bg-gray-700/60 hover:text-white transition-colors"
                aria-label="Go to Homepage"
            >
                <HomeIcon />
            </button>
        )}
        <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
            UNUGHA Campus Power Monitoring
            </h1>
            <p className="text-cyan-400 mt-1">Real-time 3-Phase Electrical Panel</p>
        </div>
      </div>
      <div className="mt-4 sm:mt-0 text-right bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-700">
        <p className="text-lg font-medium text-white">{currentTime.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <p className="text-2xl font-bold text-cyan-300 tracking-wider">{currentTime.toLocaleTimeString()}</p>
      </div>
    </header>
  );
};

export default Header;
