const mongoose = require('mongoose');
const Booking = require('./models/Booking');

// Sample bookings data
const sampleBookings = [
  {
    clientName: 'TechFlow Inc',
    email: 'tech@flow.com',
    phone: '+1 555-0123',
    service: 'IT / ICT Services',
    date: new Date('2024-01-24'),
    status: 'Pending',
    notes: 'Initial consultation requested for network infrastructure upgrade',
    amount: 25000
  },
  {
    clientName: 'Studio G',
    email: 'studio@g.com',
    phone: '+1 555-0124',
    service: 'Video Editing',
    date: new Date('2024-01-22'),
    status: 'Approved',
    notes: 'Corporate video production project',
    amount: 12000
  },
  {
    clientName: 'Nexus Corp',
    email: 'nexus@corp.com',
    phone: '+1 555-0125',
    service: 'Marketing Services',
    date: new Date('2024-01-20'),
    status: 'Rejected',
    notes: 'Budget constraints - client may reconsider next quarter',
    amount: 35000
  },
  {
    clientName: 'Elevate Digital',
    email: 'hello@elevate.com',
    phone: '+1 555-0126',
    service: 'Photo Editing',
    date: new Date('2024-01-18'),
    status: 'Approved',
    notes: 'Product photography editing for e-commerce catalog',
    amount: 3000
  },
  {
    clientName: 'John Doe',
    email: 'john@example.com',
    phone: '+1 555-0127',
    service: 'Computer Maintenance',
    date: new Date('2024-01-25'),
    status: 'Pending',
    notes: 'Laptop repair and software optimization',
    amount: 5000
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mystore');
    console.log('Connected to MongoDB');

    // Clear existing bookings
    await Booking.deleteMany({});
    console.log('Cleared existing bookings');

    // Insert sample bookings
    const insertedBookings = await Booking.insertMany(sampleBookings);
    console.log(`Inserted ${insertedBookings.length} sample bookings:`);
    
    insertedBookings.forEach((booking, index) => {
      console.log(`${index + 1}. ${booking.clientName} - ${booking.service} (${booking.status})`);
    });

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
  }
}

// Load environment variables
require('dotenv').config();

// Run the seed function
seedDatabase();
