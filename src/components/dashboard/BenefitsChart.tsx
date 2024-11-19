import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { BenefitDistribution } from '../../types/dashboard';
import { ChartCard } from './ChartCard';

ChartJS.register(ArcElement, Tooltip, Legend);

interface BenefitsChartProps {
  data: BenefitDistribution[];
}

export function BenefitsChart({ data }: BenefitsChartProps) {
  const chartData = {
    labels: data.map((item) => item.benefit),
    datasets: [
      {
        data: data.map((item) => item.employees),
        backgroundColor: [
          'rgba(99, 102, 241, 0.5)',
          'rgba(34, 197, 94, 0.5)',
          'rgba(239, 68, 68, 0.5)',
          'rgba(234, 179, 8, 0.5)',
          'rgba(168, 85, 247, 0.5)',
        ],
        borderColor: [
          'rgba(99, 102, 241, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(234, 179, 8, 1)',
          'rgba(168, 85, 247, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
  };

  return (
    <ChartCard title="Benefits Distribution">
      <Doughnut data={chartData} options={options} />
    </ChartCard>
  );
}