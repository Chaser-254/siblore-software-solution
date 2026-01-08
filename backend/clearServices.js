const mongoose = require('mongoose');
const Service = require('./models/Service');
require('dotenv').config();

async function clearServices() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear all services
    await Service.deleteMany({});
    console.log('All services cleared from database');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

clearServices();
