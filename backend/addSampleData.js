const mongoose = require('mongoose');
const Booking = require('./models/Booking');
require('dotenv').config();

async function addSampleBookings() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing bookings
    await Booking.deleteMany({});
    console.log('Cleared existing bookings');

    // Sample bookings
    const sampleBookings = [
      {
        clientName: 'John Doe',
        email: 'john@example.com',
        phone: '+254712345678',
        service: 'Web Development',
        date: new Date('2024-01-15'),
        status: 'Approved',
        notes: 'Corporate website redesign',
        amount: 50000
      },
      {
        clientName: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+254723456789',
        service: 'Mobile App Development',
        date: new Date('2024-01-20'),
        status: 'Pending',
        notes: 'E-commerce mobile app',
        amount: 75000
      },
      {
        clientName: 'Mike Johnson',
        email: 'mike@example.com',
        phone: '+254734567890',
        service: 'UI/UX Design',
        date: new Date('2024-01-10'),
        status: 'Approved',
        notes: 'Dashboard design project',
        amount: 30000
      },
      {
        clientName: 'Sarah Williams',
        email: 'sarah@example.com',
        phone: '+254745678901',
        service: 'Web Development',
        date: new Date('2024-01-25'),
        status: 'Rejected',
        notes: 'Budget too high',
        amount: 60000
      },
      {
        clientName: 'David Brown',
        email: 'david@example.com',
        phone: '+254756789012',
        service: 'Mobile App Development',
        date: new Date('2024-01-18'),
        status: 'Approved',
        notes: 'Fitness tracking app',
        amount: 80000
      }
    ];

    // Insert sample bookings
    await Booking.insertMany(sampleBookings);
    console.log('Sample bookings added successfully');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

addSampleBookings();
