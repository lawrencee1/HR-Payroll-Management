import { PayrollEntry, PayrollSummary } from '../types/payroll';

export const mockPayrollEntries: PayrollEntry[] = [
  {
    id: '1',
    employeeId: 'EMP001',
    employeeName: 'John Doe',
    department: 'Engineering',
    month: 'March',
    year: 2024,
    baseSalary: 75000,
    components: [
      {
        id: 'c1',
        name: 'Housing Allowance',
        type: 'earning',
        amount: 15000,
        isPercentage: false,
      },
      {
        id: 'c2',
        name: 'Transportation',
        type: 'earning',
        amount: 5000,
        isPercentage: false,
      },
      {
        id: 'c3',
        name: 'Tax',
        type: 'deduction',
        amount: 20,
        isPercentage: true,
      },
      {
        id: 'c4',
        name: 'Insurance',
        type: 'deduction',
        amount: 2500,
        isPercentage: false,
      },
    ],
    totalEarnings: 95000,
    totalDeductions: 21500,
    netSalary: 73500,
    status: 'pending_review',
    workingDays: 22,
    daysPresent: 21,
    overtimeHours: 8,
  },
  // Add more mock entries as needed
];

export const mockPayrollSummary: PayrollSummary = {
  totalEmployees: 156,
  totalPayout: 11250000,
  averageSalary: 72115,
  departmentWiseTotal: {
    Engineering: 4250000,
    Marketing: 2150000,
    Sales: 2850000,
    HR: 1000000,
    Finance: 1000000,
  },
  status: {
    draft: 25,
    pending_review: 45,
    approved: 80,
    paid: 6,
  },
};