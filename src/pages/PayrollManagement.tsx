import { useState } from 'react';
import { PayrollEntry } from '../types/payroll';
import { mockPayrollEntries, mockPayrollSummary } from '../data/mockPayroll';
import { PayrollTable } from '../components/payroll/PayrollTable';
import { PayrollSummaryCards } from '../components/payroll/PayrollSummaryCards';
import { PayrollStatusChart } from '../components/payroll/PayrollStatusChart';
import { DepartmentPayrollChart } from '../components/payroll/DepartmentPayrollChart';
import { TaxCalculator } from '../components/tax/TaxCalculator';
import toast from 'react-hot-toast';

export function PayrollManagement() {
  const [entries, setEntries] = useState(mockPayrollEntries);
  const [activeTab, setActiveTab] = useState<'overview' | 'tax'>('overview');

  const handleViewEntry = (entry: PayrollEntry) => {
    toast.success(`Viewing payroll entry for ${entry.employeeName}`);
  };

  const handleEditEntry = (entry: PayrollEntry) => {
    toast.success(`Editing payroll entry for ${entry.employeeName}`);
  };

  const handleApproveEntry = (entry: PayrollEntry) => {
    setEntries(
      entries.map((e) =>
        e.id === entry.id ? { ...e, status: 'approved' } : e
      )
    );
    toast.success(`Approved payroll for ${entry.employeeName}`);
  };

  const handleRejectEntry = (entry: PayrollEntry) => {
    setEntries(
      entries.map((e) =>
        e.id === entry.id ? { ...e, status: 'draft' } : e
      )
    );
    toast.error(`Rejected payroll for ${entry.employeeName}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Payroll Management
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage and process employee payroll efficiently
            </p>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`${
                  activeTab === 'overview'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('tax')}
                className={`${
                  activeTab === 'tax'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
              >
                Tax Calculator
              </button>
            </nav>
          </div>

          {activeTab === 'overview' ? (
            <>
              <PayrollSummaryCards summary={mockPayrollSummary} />
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <PayrollStatusChart summary={mockPayrollSummary} />
                <DepartmentPayrollChart summary={mockPayrollSummary} />
              </div>
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <PayrollTable
                    entries={entries}
                    onViewEntry={handleViewEntry}
                    onEditEntry={handleEditEntry}
                    onApproveEntry={handleApproveEntry}
                    onRejectEntry={handleRejectEntry}
                  />
                </div>
              </div>
            </>
          ) : (
            <TaxCalculator />
          )}
        </div>
      </div>
    </div>
  );
}