import { AllowanceComponent, DeductionComponent, TaxBracket, TaxCalculation } from '../types/tax';

// 2024 Tax Brackets (example rates)
export const TAX_BRACKETS: TaxBracket[] = [
  { min: 0, max: 11000, rate: 10, deduction: 0 },
  { min: 11001, max: 44725, rate: 12, deduction: 1100 },
  { min: 44726, max: 95375, rate: 22, deduction: 5147 },
  { min: 95376, max: 182100, rate: 24, deduction: 7836 },
  { min: 182101, max: 231250, rate: 32, deduction: 15814 },
  { min: 231251, max: 578125, rate: 35, deduction: 18683 },
  { min: 578126, max: null, rate: 37, deduction: 22288 },
];

export function calculateGrossIncome(
  baseSalary: number,
  allowances: AllowanceComponent[]
): number {
  const annualBaseSalary = baseSalary * 12;
  
  const totalAllowances = allowances.reduce((total, allowance) => {
    let amount = allowance.amount;
    
    // Convert to annual amount based on frequency
    if (allowance.frequency === 'monthly') {
      amount *= 12;
    }
    
    return total + amount;
  }, 0);

  return annualBaseSalary + totalAllowances;
}

export function calculateTaxableIncome(
  grossIncome: number,
  allowances: AllowanceComponent[],
  deductions: DeductionComponent[]
): number {
  // Sum only taxable allowances
  const taxableAllowances = allowances
    .filter(a => a.taxable)
    .reduce((total, allowance) => {
      let amount = allowance.amount;
      if (allowance.frequency === 'monthly') {
        amount *= 12;
      }
      return total + amount;
    }, 0);

  // Calculate pre-tax deductions
  const preTaxDeductions = deductions
    .filter(d => d.preTotal)
    .reduce((total, deduction) => {
      if (deduction.type === 'percentage') {
        return total + (grossIncome * deduction.amount / 100);
      }
      return total + deduction.amount;
    }, 0);

  return grossIncome + taxableAllowances - preTaxDeductions;
}

export function calculateTax(taxableIncome: number): TaxCalculation {
  let totalTax = 0;
  const brackets: TaxCalculation['brackets'] = [];

  for (let i = 0; i < TAX_BRACKETS.length; i++) {
    const bracket = TAX_BRACKETS[i];
    const nextBracket = TAX_BRACKETS[i + 1];
    
    if (taxableIncome > bracket.min) {
      const bracketMax = bracket.max ?? Infinity;
      const incomeInBracket = Math.min(
        taxableIncome - bracket.min,
        (bracket.max ?? taxableIncome) - bracket.min
      );
      
      const bracketTax = (incomeInBracket * bracket.rate) / 100;
      totalTax += bracketTax;
      
      brackets.push({
        bracket,
        amount: incomeInBracket,
        tax: bracketTax,
      });
      
      if (!nextBracket || taxableIncome <= bracketMax) {
        break;
      }
    }
  }

  return {
    grossIncome: taxableIncome,
    taxableIncome,
    totalTax,
    effectiveRate: (totalTax / taxableIncome) * 100,
    brackets,
    deductions: [],
  };
}