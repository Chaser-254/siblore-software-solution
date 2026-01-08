const mongoose = require('mongoose');
const contractSchema = new mongoose.Schema({
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
    type: String
  },
  company: {
    type: String,
    trim: true
  },
  service: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  signature: {
    type: String,
    // Base64 encoded signature image
    required: true
  },
  signedDate: {
    type: Date,
    default: Date.now
  },
  paymentMethod: {
    type: String,
    enum: ['mpesa', 'card'],
    required: true
  },
  depositAmount: {
    type: String,
    required: true
  },
  depositPaid: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['signed', 'payment_pending', 'active', 'completed'],
    default: 'signed'
  }
}, {
  timestamps: true
});
module.exports = mongoose.model('Contract', contractSchema);