
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
      
      const prompt = `
        You are an expert AI energy advisor for the UNUGHA university campus.
        Analyze the following real-time 3-phase power data and provide a concise, actionable report in markdown format.
        
        Current Data: ${dataSummary}

        Your report should include:
        1.  A brief "System Status" summary (e.g., "All systems nominal," "Minor voltage fluctuation detected," "Critical alert on Phase X").
        2.  A section on "Potential Issues" if any anomalies are detected (like voltage deviations, high current, or imbalances).
        3.  A section with one or two "Efficiency Recommendations" (e.g., "Consider shifting non-critical loads from Phase T..." or "Overall consumption is stable, continue monitoring.").
        
        Keep the language clear and direct for technical staff. Do not include a preamble.
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
    return text.split('\n').map((line, index) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <h4 key={index} className="font-bold text-cyan-400 mt-3 mb-1">{line.replace(/\*\*/g, '')}</h4>;
      }
      if (line.startsWith('* ')) {
        return <li key={index} className="ml-4 list-disc">{line.substring(2)}</li>;
      }
       if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ')) {
        const headingText = line.substring(3).replace(/\*\*/g, '');
        const heading = headingText.split(':')[0];
        const content = headingText.split(':')[1];
        return <div key={index} className="mt-2"><strong className="text-cyan-400">{heading}:</strong>{content}</div>;
       }
      return <p key={index}>{line}</p>;
    });
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-700 h-full flex flex-col">
      <div className="flex-grow overflow-y-auto pr-2">
        {isLoading && (
            <div className="flex flex-col items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
                <p className="mt-4 text-gray-300">Analyzing data...</p>
            </div>
        )}
        {error && <p className="text-red-400">{error}</p>}
        {analysis ? (
             <div className="prose prose-sm prose-invert text-gray-300 max-w-none">
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
