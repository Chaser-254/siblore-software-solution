const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true
  },
  service: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  notes: {
    type: String
  },
  amount: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});
module.exports = mongoose.model('Booking', bookingSchema);