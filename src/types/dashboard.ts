export interface PayrollSummary {
  month: string;
  totalSalary: number;
  bonuses: number;
  deductions: number;
}

export interface AttendanceData {
  date: string;
  present: number;
  absent: number;
  leave: number;
}

export interface PerformanceMetric {
  department: string;
  score: number;
}

export interface BenefitDistribution {
  benefit: string;
  employees: number;
}

export interface DashboardData {
  payrollSummary: PayrollSummary[];
  attendanceData: AttendanceData[];
  performanceMetrics: PerformanceMetric[];
  benefitDistribution: BenefitDistribution[];
  totalEmployees: number;
  activeProjects: number;
  openPositions: number;
  upcomingReviews: number;
}