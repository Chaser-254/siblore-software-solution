import { useState, useEffect } from 'react';
import { Search, Filter, Check, X, Eye, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { apiService, Booking } from '../services/api';
export function AdminBookingsTable() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await apiService.getBookings();
      setBookings(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch bookings');
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };
  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await apiService.updateBookingStatus(id, newStatus);
      setBookings(bookings.map(b => b._id === id ? { ...b, status: newStatus as 'Pending' | 'Approved' | 'Rejected' } : b));
    } catch (err) {
      console.error('Error updating booking status:', err);
      alert('Failed to update booking status');
    }
  };
  const handleDelete = async (id: string, client: string) => {
    if (window.confirm(`Are you sure you want to delete the booking from ${client}? This action cannot be undone.`)) {
      try {
        await apiService.deleteBooking(id);
        setBookings(bookings.filter(b => b._id !== id));
      } catch (err) {
        console.error('Error deleting booking:', err);
        alert('Failed to delete booking');
      }
    }
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-success/10 text-success border-success/20';
      case 'Rejected':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    }
  };
  const filteredBookings = bookings.filter(b => 
    b.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.service.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-white">
            Bookings
          </h2>
          <p className="text-text-secondary text-sm">
            Manage client bookings and requests
          </p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
            <input type="text" placeholder="Search bookings..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 bg-dark-cardAlt border border-dark-border rounded-lg text-white focus:border-primary-blue focus:ring-1 focus:ring-primary-blue outline-none transition-all w-full md:w-64" />
          </div>
          <button className="px-4 py-2 bg-dark-cardAlt border border-dark-border rounded-lg text-text-secondary flex items-center gap-2 hover:text-white hover:border-primary-blue transition-all">
            <Filter size={18} />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>
      </div>

      {loading && (
        <div className="text-center py-12 text-text-secondary">
          Loading bookings...
        </div>
      )}

      {error && (
        <div className="text-center py-12 text-red-400">
          {error}
          <button onClick={fetchBookings} className="ml-4 text-primary-cyan hover:text-primary-blue">
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="bg-dark-cardAlt border border-dark-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-border bg-dark-bg/50">
                  <th className="text-left py-4 px-6 text-sm font-medium text-text-secondary">
                    Client
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-text-secondary">
                    Service
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-text-secondary hidden md:table-cell">
                    Date
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-text-secondary">
                    Status
                  </th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-text-secondary">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking, index) => <motion.tr key={booking._id} initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: index * 0.05
            }} className="border-b border-dark-border last:border-0 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6">
                    <div>
                      <p className="text-white font-medium">{booking.clientName}</p>
                      <p className="text-text-secondary text-xs">
                        {booking.email}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-text-secondary">
                    {booking.service}
                  </td>
                  <td className="py-4 px-6 text-text-secondary hidden md:table-cell">
                    {new Date(booking.date).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {booking.status === 'Pending' && <>
                          <button onClick={() => handleStatusChange(booking._id, 'Approved')} className="p-2 rounded-lg bg-success/10 text-success hover:bg-success/20 transition-colors" title="Approve">
                            <Check size={16} />
                          </button>
                          <button onClick={() => handleStatusChange(booking._id, 'Rejected')} className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors" title="Reject">
                            <X size={16} />
                          </button>
                        </>}
                      <button onClick={() => handleDelete(booking._id, booking.clientName)} className="p-2 rounded-lg text-text-secondary hover:text-red-400 hover:bg-red-500/10 transition-colors" title="Delete Booking">
                        <Trash2 size={16} />
                      </button>
                      <button className="p-2 rounded-lg text-text-secondary hover:text-white hover:bg-white/5 transition-colors" title="View Details">
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>)}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!loading && !error && filteredBookings.length === 0 && <div className="text-center py-12 text-text-secondary">
          No bookings found matching your search.
        </div>}
    </div>;
}