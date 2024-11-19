import { useState } from 'react';
import { PayrollEntry } from '../../types/payroll';
import { Edit2, Eye, CheckCircle, XCircle } from 'lucide-react';

interface PayrollTableProps {
  entries: PayrollEntry[];
  onViewEntry: (entry: PayrollEntry) => void;
  onEditEntry: (entry: PayrollEntry) => void;
  onApproveEntry: (entry: PayrollEntry) => void;
  onRejectEntry: (entry: PayrollEntry) => void;
}

export function PayrollTable({
  entries,
  onViewEntry,
  onEditEntry,
  onApproveEntry,
  onRejectEntry,
}: PayrollTableProps) {
  const [sortField, setSortField] = useState<keyof PayrollEntry>('employeeName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const sortedEntries = [...entries].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    const direction = sortDirection === 'asc' ? 1 : -1;
    return aValue < bValue ? -direction : direction;
  });

  const handleSort = (field: keyof PayrollEntry) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStatusColor = (status: PayrollEntry['status']) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'pending_review':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'paid':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('employeeName')}
            >
              Employee
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('department')}
            >
              Department
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('netSalary')}
            >
              Net Salary
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('status')}
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedEntries.map((entry) => (
            <tr key={entry.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {entry.employeeName}
                </div>
                <div className="text-sm text-gray-500">{entry.employeeId}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {entry.department}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${entry.netSalary.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                    entry.status
                  )}`}
                >
                  {entry.status.replace('_', ' ').toUpperCase()}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onViewEntry(entry)}
                  className="text-indigo-600 hover:text-indigo-900 mx-2"
                >
                  <Eye className="h-5 w-5" />
                </button>
                {entry.status === 'draft' && (
                  <button
                    onClick={() => onEditEntry(entry)}
                    className="text-blue-600 hover:text-blue-900 mx-2"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                )}
                {entry.status === 'pending_review' && (
                  <>
                    <button
                      onClick={() => onApproveEntry(entry)}
                      className="text-green-600 hover:text-green-900 mx-2"
                    >
                      <CheckCircle className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onRejectEntry(entry)}
                      className="text-red-600 hover:text-red-900 mx-2"
                    >
                      <XCircle className="h-5 w-5" />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}