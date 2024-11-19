import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { PayrollSummary } from '../../types/dashboard';
import { ChartCard } from './ChartCard';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface PayrollChartProps {
  data: PayrollSummary[];
}

export function PayrollChart({ data }: PayrollChartProps) {
  const chartData = {
    labels: data.map((item) => item.month),
    datasets: [
      {
        label: 'Total Salary',
        data: data.map((item) => item.totalSalary),
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
      },
      {
        label: 'Bonuses',
        data: data.map((item) => item.bonuses),
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
      },
      {
        label: 'Deductions',
        data: data.map((item) => item.deductions),
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <ChartCard title="Payroll Summary">
      <Bar data={chartData} options={options} />
    </ChartCard>
  );
}