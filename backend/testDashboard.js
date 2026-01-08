const mongoose = require('mongoose');

async function testDashboard() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mystore');
    console.log('Connected to MongoDB');

    const Booking = require('./models/Booking');
    const bookings = await Booking.find({}).sort({ createdAt: -1 });
    
    console.log('Dashboard Statistics Test:');
    console.log('========================');
    
    // Basic counts
    const totalBookings = bookings.length;
    const pendingBookings = bookings.filter(b => b.status === 'Pending').length;
    const approvedBookings = bookings.filter(b => b.status === 'Approved').length;
    const rejectedBookings = bookings.filter(b => b.status === 'Rejected').length;
    
    // Unique clients
    const uniqueClients = new Set(bookings.map(b => b.email));
    const totalClients = uniqueClients.size;
    
    // Revenue calculation
    const totalRevenue = bookings
      .filter(b => b.status === 'Approved')
      .reduce((sum, booking) => sum + (booking.amount || 0), 0);
    
    console.log(`Total Bookings: ${totalBookings}`);
    console.log(`Pending: ${pendingBookings}`);
    console.log(`Approved: ${approvedBookings}`);
    console.log(`Rejected: ${rejectedBookings}`);
    console.log(`Total Clients: ${totalClients}`);
    console.log(`Total Revenue: KSH ${totalRevenue.toLocaleString()}`);
    
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
    
    console.log('\nRevenue by Service:');
    Object.values(revenueByService).forEach(service => {
      console.log(`  ${service.service}: KSH ${service.revenue.toLocaleString()} (${service.count} bookings)`);
    });
    
    console.log('\nDashboard test completed successfully!');
  } catch (error) {
    console.error('Error testing dashboard:', error);
  } finally {
    await mongoose.disconnect();
  }
}

require('dotenv').config();
testDashboard();
