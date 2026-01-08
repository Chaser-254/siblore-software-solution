const mongoose = require('mongoose');
const Booking = require('./models/Booking');

async function testAPI() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mystore');
    console.log('Connected to MongoDB');

    // Test fetching bookings
    const bookings = await Booking.find({}).sort({ createdAt: -1 });
    console.log('Found bookings:');
    bookings.forEach((booking, index) => {
      console.log(`${index + 1}. ${booking.clientName} - ${booking.service} (${booking.status}) - ${booking.email}`);
    });

    console.log(`\nTotal bookings: ${bookings.length}`);
    console.log('API test successful!');
  } catch (error) {
    console.error('Error testing API:', error);
  } finally {
    await mongoose.disconnect();
  }
}

// Load environment variables
require('dotenv').config();

// Run the test
testAPI();
