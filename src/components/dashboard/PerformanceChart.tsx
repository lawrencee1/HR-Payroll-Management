import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { PerformanceMetric } from '../../types/dashboard';
import { ChartCard } from './ChartCard';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface PerformanceChartProps {
  data: PerformanceMetric[];
}

export function PerformanceChart({ data }: PerformanceChartProps) {
  const chartData = {
    labels: data.map((item) => item.department),
    datasets: [
      {
        label: 'Performance Score',
        data: data.map((item) => item.score),
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <ChartCard title="Department Performance">
      <Radar data={chartData} options={options} />
    </ChartCard>
  );
}