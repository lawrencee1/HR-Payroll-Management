export interface AllowanceComponent {
  id: string;
  name: string;
  amount: number;
  type: 'fixed' | 'variable';
  frequency: 'monthly' | 'annual' | 'one-time';
  taxable: boolean;
}

export interface DeductionComponent {
  id: string;
  name: string;
  amount: number;
  type: 'percentage' | 'fixed';
  preTotal?: boolean; // If true, applied before tax calculation
}

export interface TaxBracket {
  min: number;
  max: number | null;
  rate: number; // Percentage
  deduction: number; // Standard deduction for this bracket
}

export interface TaxCalculation {
  grossIncome: number;
  taxableIncome: number;
  totalTax: number;
  effectiveRate: number;
  brackets: {
    bracket: TaxBracket;
    amount: number;
    tax: number;
  }[];
  deductions: {
    name: string;
    amount: number;
  }[];
}