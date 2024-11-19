import { useAuthStore } from '../store/auth';
import { Users, Briefcase, FileSearch, ClipboardCheck } from 'lucide-react';
import { mockDashboardData } from '../data/mockDashboard';
import { StatCard } from '../components/dashboard/StatCard';
import { PayrollChart } from '../components/dashboard/PayrollChart';
import { AttendanceChart } from '../components/dashboard/AttendanceChart';
import { PerformanceChart } from '../components/dashboard/PerformanceChart';
import { BenefitsChart } from '../components/dashboard/BenefitsChart';

export function Dashboard() {
  const { user, logout } = useAuthStore();
  const isAdmin = user?.role === 'admin';
  const isHrManager = user?.role === 'hr_manager';
  const canViewAnalytics = isAdmin || isHrManager;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">HR & Payroll System</h1>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700 mr-4">
                Welcome, {user?.name} ({user?.role})
              </span>
              <button
                onClick={logout}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {canViewAnalytics ? (
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total Employees"
                value={mockDashboardData.totalEmployees}
                icon={Users}
                trend={{ value: 5.6, isPositive: true }}
              />
              <StatCard
                title="Active Projects"
                value={mockDashboardData.activeProjects}
                icon={Briefcase}
                trend={{ value: 2.3, isPositive: true }}
              />
              <StatCard
                title="Open Positions"
                value={mockDashboardData.openPositions}
                icon={FileSearch}
                trend={{ value: 1.2, isPositive: false }}
              />
              <StatCard
                title="Upcoming Reviews"
                value={mockDashboardData.upcomingReviews}
                icon={ClipboardCheck}
                trend={{ value: 8.1, isPositive: true }}
              />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <PayrollChart data={mockDashboardData.payrollSummary} />
              <AttendanceChart data={mockDashboardData.attendanceData} />
              <PerformanceChart data={mockDashboardData.performanceMetrics} />
              <BenefitsChart data={mockDashboardData.benefitDistribution} />
            </div>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Employee Dashboard</h2>
            <div className="p-4 bg-yellow-50 rounded-md">
              <p className="text-yellow-700">
                Welcome to your employee dashboard. Here you can view your personal information
                and payroll details. Contact HR for any questions or concerns.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}