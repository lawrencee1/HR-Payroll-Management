import { Bar } from 'react-chartjs-2';
import { PayrollSummary } from '../../types/payroll';
import { ChartCard } from '../dashboard/ChartCard';

interface DepartmentPayrollChartProps {
  summary: PayrollSummary;
}

export function DepartmentPayrollChart({ summary }: DepartmentPayrollChartProps) {
  const data = {
    labels: Object.keys(summary.departmentWiseTotal),
    datasets: [
      {
        label: 'Total Payroll by Department',
        data: Object.values(summary.departmentWiseTotal),
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1,
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
        ticks: {
          callback: (value: number) => `$${value.toLocaleString()}`,
        },
      },
    },
  };

  return (
    <ChartCard title="Department-wise Payroll Distribution">
      <Bar data={data} options={options} />
    </ChartCard>
  );
}