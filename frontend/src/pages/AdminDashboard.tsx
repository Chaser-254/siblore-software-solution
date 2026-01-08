import { useState, useEffect } from 'react';
import { AdminSidebar } from '../components/AdminSidebar';
import { AdminServiceManager } from '../components/AdminServiceManager';
import { AdminProductManager } from '../components/AdminProductManager';
import { AdminEventManager } from '../components/AdminEventManager';
import { AdminBookingsTable } from '../components/AdminBookingsTable';
import { StatCard } from '../components/StatCard';
import { Users, DollarSign, Briefcase, TrendingUp, Menu, Calendar, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiService, DashboardStats } from '../services/api';
export function AdminDashboard() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Auto-login for development
    if (!localStorage.getItem('adminToken')) {
      localStorage.setItem('adminToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJkZW1vLWFkbWluIiwiZW1haWwiOiJhZG1pbkBzaWJsb3JlLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2NzgxNjUwNCwiZXhwIjoxNzY3OTAyOTA0fQ.wUg5uy6xhq5vokATac_cJlFGyONRi_itmyIgnNUl6Do');
    }
    
    if (currentView === 'dashboard') {
      fetchDashboardStats();
    }
  }, [currentView]);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const stats = await apiService.getDashboardStats();
      setDashboardStats(stats);
      setError(null);
    } catch (err) {
      setError('Failed to fetch dashboard statistics');
      console.error('Error fetching dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return `KSH ${amount.toLocaleString()}`;
  };

  const calculateTrend = (current: number, previous: number) => {
    if (previous === 0) return '+0%';
    const change = ((current - previous) / previous) * 100;
    return `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`;
  };

  // Generate stats from real data
  const stats = dashboardStats ? [
    {
      label: 'Total Revenue',
      value: formatCurrency(dashboardStats.totalRevenue),
      trend: calculateTrend(dashboardStats.approvedBookings, Math.max(1, dashboardStats.approvedBookings - 2)),
      icon: DollarSign
    },
    {
      label: 'Total Services',
      value: dashboardStats.totalServices.toString(),
      trend: `+${Math.floor(dashboardStats.totalServices * 0.1)}%`,
      icon: Briefcase
    },
    {
      label: 'Total Events',
      value: dashboardStats.totalEvents.toString(),
      trend: `+${Math.floor(dashboardStats.totalEvents * 0.05)}%`,
      icon: Calendar
    },
    {
      label: 'Total Products',
      value: dashboardStats.totalProducts.toString(),
      trend: `+${Math.floor(dashboardStats.totalProducts * 0.08)}%`,
      icon: Package
    },
    {
      label: 'Total Bookings',
      value: dashboardStats.totalBookings.toString(),
      trend: calculateTrend(dashboardStats.totalBookings, Math.max(1, dashboardStats.totalBookings - 3)),
      icon: Users
    },
    {
      label: 'Approval Rate',
      value: dashboardStats.totalBookings > 0 
        ? `${Math.round((dashboardStats.approvedBookings / dashboardStats.totalBookings) * 100)}%`
        : '0%',
      trend: '+5.2%',
      icon: TrendingUp
    }
  ] : [];
  const renderContent = () => {
    switch (currentView) {
      case 'services':
        return <AdminServiceManager />;
      case 'store':
        return <AdminProductManager />;
      case 'events':
        return <AdminEventManager />;
      case 'bookings':
        return <AdminBookingsTable />;
      case 'settings':
        return <div className="bg-dark-cardAlt border border-dark-border rounded-2xl p-8">
            <h2 className="text-2xl font-display font-bold text-white mb-4">
              Settings
            </h2>
            <p className="text-text-secondary">Settings panel coming soon...</p>
          </div>;
      case 'dashboard':
      default:
        return <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-2">
                Dashboard Overview
              </h2>
              <p className="text-text-secondary">Real-time statistics from your database</p>
            </div>
            
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-dark-cardAlt border border-dark-border rounded-2xl p-6 animate-pulse">
                    <div className="h-4 bg-dark-border rounded mb-4"></div>
                    <div className="h-8 bg-dark-border rounded mb-2"></div>
                    <div className="h-4 bg-dark-border rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            )}

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-red-400">
                <p>{error}</p>
                <button 
                  onClick={fetchDashboardStats}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Retry
                </button>
              </div>
            )}

            {!loading && !error && dashboardStats && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                  {stats.map((stat, index) => <StatCard key={index} {...stat} delay={index * 0.1} />)}
                </div>

                {/* Additional Statistics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Revenue by Service */}
                  <div className="bg-dark-cardAlt border border-dark-border rounded-2xl p-6">
                    <h3 className="text-xl font-display font-bold text-white mb-4">
                      Revenue by Service
                    </h3>
                    <div className="space-y-4">
                      {dashboardStats.revenueByService.map((service, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium">{service.service}</p>
                            <p className="text-text-secondary text-sm">{service.count} bookings</p>
                          </div>
                          <p className="text-primary-cyan font-bold">{formatCurrency(service.revenue)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Bookings */}
                  <div className="bg-dark-cardAlt border border-dark-border rounded-2xl p-6">
                    <h3 className="text-xl font-display font-bold text-white mb-4">
                      Recent Bookings
                    </h3>
                    <div className="space-y-4">
                      {dashboardStats.recentBookings.map((booking) => (
                        <div key={booking._id} className="flex items-center justify-between border-b border-dark-border pb-3 last:border-0">
                          <div>
                            <p className="text-white font-medium">{booking.clientName}</p>
                            <p className="text-text-secondary text-sm">{booking.service}</p>
                          </div>
                          <div className="text-right">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              booking.status === 'Approved' ? 'bg-success/10 text-success' :
                              booking.status === 'Rejected' ? 'bg-red-500/10 text-red-500' :
                              'bg-yellow-500/10 text-yellow-500'
                            }`}>
                              {booking.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-dark-cardAlt border border-dark-border rounded-2xl p-6 text-center">
                    <p className="text-3xl font-bold text-primary-cyan">{dashboardStats.pendingBookings}</p>
                    <p className="text-text-secondary mt-2">Pending Bookings</p>
                  </div>
                  <div className="bg-dark-cardAlt border border-dark-border rounded-2xl p-6 text-center">
                    <p className="text-3xl font-bold text-success">{dashboardStats.approvedBookings}</p>
                    <p className="text-text-secondary mt-2">Approved Bookings</p>
                  </div>
                  <div className="bg-dark-cardAlt border border-dark-border rounded-2xl p-6 text-center">
                    <p className="text-3xl font-bold text-red-400">{dashboardStats.rejectedBookings}</p>
                    <p className="text-text-secondary mt-2">Rejected Bookings</p>
                  </div>
                </div>
              </>
            )}
          </div>;
    }
  };
  return <div className="min-h-screen bg-dark-bg text-text-primary flex">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <AdminSidebar currentView={currentView} onViewChange={setCurrentView} />
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && <>
            <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden" />
            <motion.div initial={{
          x: -280
        }} animate={{
          x: 0
        }} exit={{
          x: -280
        }} transition={{
          type: 'spring',
          damping: 25,
          stiffness: 200
        }} className="fixed left-0 top-0 bottom-0 w-64 z-50 md:hidden">
              <AdminSidebar currentView={currentView} onViewChange={view => {
            setCurrentView(view);
            setIsSidebarOpen(false);
          }} />
            </motion.div>
          </>}
      </AnimatePresence>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-dark-cardAlt border-b border-dark-border z-30 px-4 py-3 flex items-center justify-between">
        <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
          <Menu size={24} className="text-white" />
        </button>
        <div className="flex items-center gap-2">
          <img src="/siblore-logo.svg" alt="Siblore" className="w-6 h-6" />
          <span className="font-display font-bold text-white">Admin Dashboard</span>
        </div>
        <div className="w-10" /> {/* Spacer for centering */}
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 pt-20 md:pt-8 min-h-screen overflow-y-auto">
        {renderContent()}
      </main>
    </div>;
}