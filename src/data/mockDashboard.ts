import { DashboardData } from '../types/dashboard';
import { format, subMonths } from 'date-fns';

const last6Months = Array.from({ length: 6 }, (_, i) => {
  const date = subMonths(new Date(), i);
  return format(date, 'MMM yyyy');
}).reverse();

export const mockDashboardData: DashboardData = {
  payrollSummary: last6Months.map((month) => ({
    month,
    totalSalary: Math.floor(Math.random() * 500000) + 300000,
    bonuses: Math.floor(Math.random() * 50000),
    deductions: Math.floor(Math.random() * 30000),
  })),
  
  attendanceData: last6Months.map((date) => ({
    date,
    present: Math.floor(Math.random() * 20) + 80,
    absent: Math.floor(Math.random() * 5),
    leave: Math.floor(Math.random() * 10),
  })),
  
  performanceMetrics: [
    { department: 'Engineering', score: 87 },
    { department: 'Marketing', score: 82 },
    { department: 'Sales', score: 89 },
    { department: 'HR', score: 85 },
    { department: 'Finance', score: 84 },
  ],
  
  benefitDistribution: [
    { benefit: 'Health Insurance', employees: 95 },
    { benefit: '401(k)', employees: 82 },
    { benefit: 'Life Insurance', employees: 73 },
    { benefit: 'Dental', employees: 88 },
    { benefit: 'Vision', employees: 67 },
  ],
  
  totalEmployees: 156,
  activeProjects: 12,
  openPositions: 8,
  upcomingReviews: 23,
};