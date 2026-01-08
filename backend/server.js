const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const serviceRoutes = require('./routes/services');
const bookingRoutes = require('./routes/bookings');
const contractRoutes = require('./routes/contracts');
const dashboardRoutes = require('./routes/dashboard');
const eventRoutes = require('./routes/events');
const productRoutes = require('./routes/products');
const app = express();

// Middleware
app.use(cors());
app.use(express.json({
  limit: '10mb'
})); // Increased limit for signature images
app.use(express.urlencoded({
  extended: true,
  limit: '10mb'
}));

// Serve static files from public directory
app.use('/uploads', express.static('public/uploads'));

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB')).catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/contracts', contractRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/products', productRoutes);

// Health check
app.get('/health', (req, res) => {
  res.send({
    status: 'OK',
    message: 'SibLore API is running'
  });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});