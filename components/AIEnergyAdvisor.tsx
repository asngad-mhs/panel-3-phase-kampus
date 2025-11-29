
import React, { useState, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';
import type { PhaseData } from '../types';
import { SparklesIcon } from './Icons';

interface AIEnergyAdvisorProps {
  phaseData: PhaseData[];
}

const AIEnergyAdvisor: React.FC<AIEnergyAdvisorProps> = ({ phaseData }) => {
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const getEnergyAnalysis = useCallback(async () => {
    setIsLoading(true);
    setError('');
    setAnalysis('');

    if (!process.env.API_KEY) {
        setError("API key is not configured. Please set the API_KEY environment variable.");
        setIsLoading(false);
        return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const dataSummary = phaseData.map(p => 
        `Phase ${p.name}: Voltage=${p.voltage.toFixed(1)}V, Current=${p.current.toFixed(1)}A, Power=${p.power.toFixed(2)}kW, Status=${p.status}`
      ).join('; ');

      const powers = phaseData.map(p => p.power);
      const maxPower = Math.max(...powers);
      const minPower = Math.min(...powers);
      const imbalance = maxPower > 0 ? ((maxPower - minPower) / maxPower) * 100 : 0;
      
      const prompt = `
        You are an expert AI energy advisor for the UNUGHA university campus.
        Analyze the following real-time 3-phase power data and provide a concise, actionable report in markdown format.
        
        Current Data: ${dataSummary}
        Calculated Load Imbalance: ${imbalance.toFixed(1)}%

        Your report should include:
        1.  **System Status**: A brief summary (e.g., "All systems nominal," "Minor voltage fluctuation detected," "Critical alert on Phase X").
        2.  **Load Balance Analysis**: Comment on the load imbalance percentage. If it's over 10%, it's a potential issue.
        3.  **Potential Issues**: Highlight any anomalies detected (voltage deviations outside 210-235V, high current, or imbalances).
        4.  **Efficiency Recommendations**: Provide one or two specific, actionable recommendations (e.g., "Consider shifting a 0.5kW load from Phase R to S to improve balance," or "Overall consumption is stable, continue monitoring.").
        
        Keep the language clear and direct for technical staff. Use bold for headings.
      `;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      setAnalysis(response.text);

    } catch (err) {
      console.error(err);
      setError('Failed to get analysis from AI. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [phaseData]);

  const renderFormattedAnalysis = (text: string) => {
    // Improved renderer for markdown-like text
    return text.split('\n').map((line, index) => {
        line = line.trim();
        if (line.startsWith('**') && line.endsWith('**')) {
            return <h4 key={index} className="font-bold text-cyan-400 mt-3 mb-1">{line.replace(/\*\*/g, '')}</h4>;
        }
        if (line.match(/^\d+\.\s/)) {
            const content = line.substring(line.indexOf(' ') + 1);
            const isBold = content.startsWith('**');
            const cleanContent = content.replace(/\*\*/g, '');
            const parts = cleanContent.split(':');
            return (
                 <p key={index} className="mt-1">
                    {isBold ? <strong className="text-cyan-400">{parts[0]}:</strong> : <span className="text-gray-300">{parts[0]}:</span>}
                    {parts.length > 1 && <span>{parts.slice(1).join(':')}</span>}
                </p>
            );
        }
        if (line.startsWith('* ')) {
            return <li key={index} className="ml-5 list-disc text-gray-300">{line.substring(2)}</li>;
        }
        return <p key={index} className="text-gray-300">{line}</p>;
    });
};


  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-700 h-full flex flex-col">
      <div className="flex-grow overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#22d3ee #374151' }}>
        {isLoading && (
            <div className="flex flex-col items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
                <p className="mt-4 text-gray-300">Analyzing data...</p>
            </div>
        )}
        {error && <p className="text-red-400">{error}</p>}
        {analysis ? (
             <div className="prose prose-sm prose-invert text-gray-300 max-w-none space-y-2">
                {renderFormattedAnalysis(analysis)}
             </div>
        ) : (
            !isLoading && <p className="text-gray-400 text-center mt-4">Click the button below to get an AI-powered analysis of the current energy status.</p>
        )}
      </div>
      <button
        onClick={getEnergyAnalysis}
        disabled={isLoading}
        className="mt-4 w-full flex items-center justify-center bg-cyan-500 text-gray-900 font-bold py-3 px-4 rounded-lg hover:bg-cyan-400 transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
      >
        <SparklesIcon />
        <span className="ml-2">{isLoading ? 'Analyzing...' : 'Generate AI Report'}</span>
      </button>
    </div>
  );
};

export default AIEnergyAdvisor;
