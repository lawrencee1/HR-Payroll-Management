import { useState } from 'react';
import { AllowanceComponent, DeductionComponent } from '../../types/tax';
import { calculateGrossIncome, calculateTaxableIncome, calculateTax } from '../../utils/taxCalculator';
import { TaxBreakdown } from './TaxBreakdown';
import { DollarSign, Plus, Trash2 } from 'lucide-react';

export function TaxCalculator() {
  const [baseSalary, setBaseSalary] = useState(75000);
  const [allowances, setAllowances] = useState<AllowanceComponent[]>([
    {
      id: '1',
      name: 'Housing Allowance',
      amount: 2000,
      type: 'fixed',
      frequency: 'monthly',
      taxable: true,
    },
  ]);
  const [deductions, setDeductions] = useState<DeductionComponent[]>([
    {
      id: '1',
      name: '401(k)',
      amount: 6,
      type: 'percentage',
      preTotal: true,
    },
  ]);

  const grossIncome = calculateGrossIncome(baseSalary, allowances);
  const taxableIncome = calculateTaxableIncome(grossIncome, allowances, deductions);
  const taxCalculation = calculateTax(taxableIncome);

  const addAllowance = () => {
    setAllowances([
      ...allowances,
      {
        id: Math.random().toString(36).substr(2, 9),
        name: '',
        amount: 0,
        type: 'fixed',
        frequency: 'monthly',
        taxable: true,
      },
    ]);
  };

  const addDeduction = () => {
    setDeductions([
      ...deductions,
      {
        id: Math.random().toString(36).substr(2, 9),
        name: '',
        amount: 0,
        type: 'fixed',
        preTotal: true,
      },
    ]);
  };

  const updateAllowance = (id: string, updates: Partial<AllowanceComponent>) => {
    setAllowances(
      allowances.map((a) => (a.id === id ? { ...a, ...updates } : a))
    );
  };

  const updateDeduction = (id: string, updates: Partial<DeductionComponent>) => {
    setDeductions(
      deductions.map((d) => (d.id === id ? { ...d, ...updates } : d))
    );
  };

  const removeAllowance = (id: string) => {
    setAllowances(allowances.filter((a) => a.id !== id));
  };

  const removeDeduction = (id: string) => {
    setDeductions(deductions.filter((d) => d.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Base Salary */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Base Salary</h3>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <DollarSign className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="number"
            value={baseSalary}
            onChange={(e) => setBaseSalary(Number(e.target.value))}
            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      {/* Allowances */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Allowances</h3>
          <button
            onClick={addAllowance}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Allowance
          </button>
        </div>
        
        <div className="space-y-4">
          {allowances.map((allowance) => (
            <div key={allowance.id} className="flex gap-4">
              <input
                type="text"
                value={allowance.name}
                onChange={(e) =>
                  updateAllowance(allowance.id, { name: e.target.value })
                }
                placeholder="Allowance name"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <input
                type="number"
                value={allowance.amount}
                onChange={(e) =>
                  updateAllowance(allowance.id, {
                    amount: Number(e.target.value),
                  })
                }
                placeholder="Amount"
                className="w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <select
                value={allowance.frequency}
                onChange={(e) =>
                  updateAllowance(allowance.id, {
                    frequency: e.target.value as AllowanceComponent['frequency'],
                  })
                }
                className="w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="monthly">Monthly</option>
                <option value="annual">Annual</option>
                <option value="one-time">One-time</option>
              </select>
              <button
                onClick={() => removeAllowance(allowance.id)}
                className="p-2 text-gray-400 hover:text-red-600"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Deductions */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Deductions</h3>
          <button
            onClick={addDeduction}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Deduction
          </button>
        </div>
        
        <div className="space-y-4">
          {deductions.map((deduction) => (
            <div key={deduction.id} className="flex gap-4">
              <input
                type="text"
                value={deduction.name}
                onChange={(e) =>
                  updateDeduction(deduction.id, { name: e.target.value })
                }
                placeholder="Deduction name"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <input
                type="number"
                value={deduction.amount}
                onChange={(e) =>
                  updateDeduction(deduction.id, {
                    amount: Number(e.target.value),
                  })
                }
                placeholder="Amount"
                className="w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <select
                value={deduction.type}
                onChange={(e) =>
                  updateDeduction(deduction.id, {
                    type: e.target.value as DeductionComponent['type'],
                  })
                }
                className="w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="fixed">Fixed</option>
                <option value="percentage">Percentage</option>
              </select>
              <button
                onClick={() => removeDeduction(deduction.id)}
                className="p-2 text-gray-400 hover:text-red-600"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Tax Breakdown */}
      <TaxBreakdown calculation={taxCalculation} />
    </div>
  );
}