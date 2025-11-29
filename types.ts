
export interface PhaseData {
  name: string;
  voltage: number;
  current: number;
  power: number;
  powerFactor: number;
  status: 'normal' | 'warning' | 'critical';
}

export interface HistoricalDataPoint {
  time: string;
  R: number;
  S: number;
  T: number;
}
