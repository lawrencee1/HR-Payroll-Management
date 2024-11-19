import { Doughnut } from 'react-chartjs-2';
import { PayrollSummary } from '../../types/payroll';
import { ChartCard } from '../dashboard/ChartCard';

interface PayrollStatusChartProps {
  summary: PayrollSummary;
}

export function PayrollStatusChart({ summary }: PayrollStatusChartProps) {
  const statusColors = {
    draft: 'rgba(156, 163, 175, 0.5)',
    pending_review: 'rgba(245, 158, 11, 0.5)',
    approved: 'rgba(16, 185, 129, 0.5)',
    paid: 'rgba(59, 130, 246, 0.5)',
  };

  const data = {
    labels: Object.keys(summary.status).map((status) =>
      status.replace('_', ' ').toUpperCase()
    ),
    datasets: [
      {
        data: Object.values(summary.status),
        backgroundColor: Object.values(statusColors),
        borderColor: Object.values(statusColors).map((color) =>
          color.replace('0.5', '1')
        ),
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
    <ChartCard title="Payroll Status Distribution">
      <Doughnut data={data} options={options} />
    </ChartCard>
  );
}