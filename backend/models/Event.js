const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Concerts', 'Workshops', 'Gaming', 'Arts & Culture'],
    required: true
  },
  maxAttendees: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  organizer: {
    type: String,
    required: true
  },
  organizerEmail: {
    type: String,
    required: true
  },
  organizerPhone: {
    type: String,
    required: true
  },
  tags: [{
    type: String
  }],
  gallery: [{
    type: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  attendees: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);
