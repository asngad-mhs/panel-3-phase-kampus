
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { HistoricalDataPoint } from '../types';

interface PowerChartProps {
  data: HistoricalDataPoint[];
}

const PowerChart: React.FC<PowerChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 20,
          left: -10,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
        <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} />
        <YAxis stroke="#9CA3AF" fontSize={12} domain={['dataMin - 0.5', 'dataMax + 0.5']}/>
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(31, 41, 55, 0.8)',
            borderColor: '#4A5568',
            borderRadius: '0.75rem'
          }}
          labelStyle={{ color: '#E5E7EB' }}
        />
        <Legend wrapperStyle={{fontSize: "14px"}} />
        <Line type="monotone" dataKey="R" stroke="#F87171" strokeWidth={2} dot={false} name="Phase R" />
        <Line type="monotone" dataKey="S" stroke="#FBBF24" strokeWidth={2} dot={false} name="Phase S" />
        <Line type="monotone" dataKey="T" stroke="#34D399" strokeWidth={2} dot={false} name="Phase T" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PowerChart;
