export interface SalaryComponent {
  id: string;
  name: string;
  type: 'earning' | 'deduction';
  amount: number;
  isPercentage: boolean;
}

export interface PayrollEntry {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  month: string;
  year: number;
  baseSalary: number;
  components: SalaryComponent[];
  totalEarnings: number;
  totalDeductions: number;
  netSalary: number;
  status: 'draft' | 'pending_review' | 'approved' | 'paid';
  workingDays: number;
  daysPresent: number;
  overtimeHours: number;
  comments?: string;
}

export interface PayrollSummary {
  totalEmployees: number;
  totalPayout: number;
  averageSalary: number;
  departmentWiseTotal: Record<string, number>;
  status: Record<PayrollEntry['status'], number>;
}