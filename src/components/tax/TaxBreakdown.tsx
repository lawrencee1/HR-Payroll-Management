import { TaxCalculation } from '../../types/tax';

interface TaxBreakdownProps {
  calculation: TaxCalculation;
}

export function TaxBreakdown({ calculation }: TaxBreakdownProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Tax Breakdown</h3>
      
      <div className="space-y-4">
        {/* Summary */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm text-gray-500">Gross Income</p>
            <p className="text-lg font-semibold">
              ${calculation.grossIncome.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Tax</p>
            <p className="text-lg font-semibold text-red-600">
              ${calculation.totalTax.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Taxable Income</p>
            <p className="text-lg font-semibold">
              ${calculation.taxableIncome.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Effective Rate</p>
            <p className="text-lg font-semibold">
              {calculation.effectiveRate.toFixed(2)}%
            </p>
          </div>
        </div>

        {/* Bracket Breakdown */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Tax Brackets</h4>
          <div className="space-y-2">
            {calculation.brackets.map(({ bracket, amount, tax }) => (
              <div
                key={bracket.min}
                className="flex items-center justify-between p-2 bg-gray-50 rounded"
              >
                <div>
                  <p className="text-sm font-medium">
                    {bracket.rate}% Bracket{' '}
                    <span className="text-gray-500">
                      (${bracket.min.toLocaleString()} -{' '}
                      {bracket.max
                        ? `$${bracket.max.toLocaleString()}`
                        : 'No Limit'}
                      )
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Income in bracket: ${amount.toLocaleString()}
                  </p>
                </div>
                <p className="text-sm font-semibold text-red-600">
                  ${tax.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Deductions */}
        {calculation.deductions.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Deductions Applied
            </h4>
            <div className="space-y-2">
              {calculation.deductions.map((deduction) => (
                <div
                  key={deduction.name}
                  className="flex justify-between p-2 bg-gray-50 rounded"
                >
                  <p className="text-sm">{deduction.name}</p>
                  <p className="text-sm font-medium">
                    ${deduction.amount.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}