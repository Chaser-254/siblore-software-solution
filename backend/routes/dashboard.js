const express = require('express');
const Booking = require('../models/Booking');
const Service = require('../models/Service');
const Event = require('../models/Event');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const router = express.Router();

// Get dashboard statistics (Admin only)
router.get('/stats', auth, async (req, res) => {
  try {
    // Get all data
    const [bookings, services, events, products] = await Promise.all([
      Booking.find({}).sort({ createdAt: -1 }),
      Service.find({}),
      Event.find({}),
      Product.find({})
    ]);
    
    // Basic counts
    const totalBookings = bookings.length;
    const totalServices = services.length;
    const totalEvents = events.length;
    const totalProducts = products.length;
    const pendingBookings = bookings.filter(b => b.status === 'Pending').length;
    const approvedBookings = bookings.filter(b => b.status === 'Approved').length;
    const rejectedBookings = bookings.filter(b => b.status === 'Rejected').length;
    
    // Unique clients
    const uniqueClients = new Set(bookings.map(b => b.email));
    const totalClients = uniqueClients.size;
    
    // Revenue calculation (using actual amount from approved bookings)
    const totalRevenue = bookings
      .filter(b => b.status === 'Approved')
      .reduce((sum, booking) => {
        return sum + (booking.amount || 0);
      }, 0);
    
    // Revenue by service
    const revenueByService = {};
    bookings
      .filter(b => b.status === 'Approved')
      .forEach(booking => {
        const service = booking.service;
        const revenue = booking.amount || 0;
        
        if (!revenueByService[service]) {
          revenueByService[service] = { service, revenue: 0, count: 0 };
        }
        revenueByService[service].revenue += revenue;
        revenueByService[service].count += 1;
      });
    
    // Bookings by month (last 6 months)
    const bookingsByMonth = {};
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    bookings
      .filter(b => new Date(b.createdAt) >= sixMonthsAgo)
      .forEach(booking => {
        const date = new Date(booking.createdAt);
        const monthKey = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
        
        if (!bookingsByMonth[monthKey]) {
          bookingsByMonth[monthKey] = { month: monthKey, count: 0, revenue: 0 };
        }
        bookingsByMonth[monthKey].count += 1;
        
        if (booking.status === 'Approved') {
          bookingsByMonth[monthKey].revenue += booking.amount || 0;
        }
      });
    
    // Recent bookings (last 5)
    const recentBookings = bookings.slice(0, 5);
    
    const stats = {
      totalRevenue,
      totalBookings,
      totalServices,
      totalEvents,
      totalProducts,
      pendingBookings,
      approvedBookings,
      rejectedBookings,
      totalClients,
      recentBookings,
      revenueByService: Object.values(revenueByService),
      bookingsByMonth: Object.values(bookingsByMonth).sort((a, b) => 
        new Date(a.month).getTime() - new Date(b.month).getTime()
      )
    };
    
    res.json(stats);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard statistics' });
  }
});

module.exports = router;
