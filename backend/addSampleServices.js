const mongoose = require('mongoose');
const Service = require('./models/Service');
require('dotenv').config();

async function addSampleServices() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing services
    await Service.deleteMany({});
    console.log('Cleared existing services');

    // Sample services
    const sampleServices = [
      {
        title: 'Web Development',
        description: 'Professional web development services including frontend, backend, and full-stack applications',
        price: '50000',
        delivery: '2-4 weeks',
        features: 'Custom Design, Responsive Layout, SEO Optimization, Performance Optimization',
        image: 'https://via.placeholder.com/150x150',
        category: 'Web Development',
        isActive: true
      },
      {
        title: 'Mobile App Development',
        description: 'Native and cross-platform mobile application development',
        price: '75000',
        delivery: '4-6 weeks',
        features: 'iOS Development, Android Development, Cross-Platform, UI/UX Design',
        image: 'https://via.placeholder.com/150x150',
        category: 'Web Development',
        isActive: true
      },
      {
        title: 'UI/UX Design',
        description: 'User interface and user experience design services',
        price: '30000',
        delivery: '1-2 weeks',
        features: 'Wireframing, Prototyping, User Research, Visual Design',
        image: 'https://via.placeholder.com/150x150',
        category: 'Web Development',
        isActive: true
      },
      {
        title: 'IT Consulting',
        description: 'Professional IT consulting and infrastructure planning',
        price: '25000',
        delivery: '1-3 weeks',
        features: 'System Analysis, Infrastructure Planning, Security Audit, Performance Review',
        image: 'https://via.placeholder.com/150x150',
        category: 'Consulting',
        isActive: true
      },
      {
        title: 'Database Management',
        description: 'Database design, optimization, and management services',
        price: '35000',
        delivery: '2-3 weeks',
        features: 'Database Design, Performance Optimization, Backup Solutions, Security Implementation',
        image: 'https://via.placeholder.com/150x150',
        category: 'Consulting',
        isActive: true
      }
    ];

    // Insert sample services
    await Service.insertMany(sampleServices);
    console.log('Sample services added successfully');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

addSampleServices();
