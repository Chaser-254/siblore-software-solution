const mongoose = require('mongoose');
const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: String,
    required: true
  },
  features: [{
    type: String
  }],
  delivery: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
module.exports = mongoose.model('Service', serviceSchema);