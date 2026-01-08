const express = require('express');
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');
const router = express.Router();

// Create booking (Public)
router.post('/', async (req, res) => {
  try {
    const bookingData = { ...req.body };
    
    // Convert date string to Date object if it's a string
    if (bookingData.date && typeof bookingData.date === 'string') {
      bookingData.date = new Date(bookingData.date);
    }
    
    const booking = new Booking(bookingData);
    await booking.save();
    res.status(201).send(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(400).send(error);
  }
});

// Get all bookings (Admin only)
router.get('/', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({}).sort({
      createdAt: -1
    });
    res.send(bookings);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update booking status (Admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, {
      status: req.body.status
    }, {
      new: true
    });
    if (!booking) return res.status(404).send();
    res.send(booking);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete booking (Admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).send();
    res.send({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;