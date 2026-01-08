const express = require('express');
const Event = require('../models/Event');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const router = express.Router();

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find({});
    res.send(events);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get event by ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).send('Event not found');
    }
    res.send(event);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Create event (Admin only)
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const eventData = { ...req.body };
    
    // If image was uploaded, use its path
    if (req.file) {
      eventData.image = `/uploads/${req.file.filename}`;
    }
    
    // Convert string fields to appropriate types
    if (eventData.maxAttendees) {
      eventData.maxAttendees = parseInt(eventData.maxAttendees);
    }
    if (eventData.rating) {
      eventData.rating = parseFloat(eventData.rating);
    }
    if (eventData.tags) {
      eventData.tags = eventData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    }
    if (eventData.gallery) {
      eventData.gallery = eventData.gallery.split(',').map(url => url.trim()).filter(url => url);
    }
    if (eventData.isActive !== undefined) {
      eventData.isActive = eventData.isActive === 'true';
    }
    
    const event = new Event(eventData);
    await event.save();
    res.status(201).send(event);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update event
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const eventData = { ...req.body };
    
    // If image was uploaded, use its path
    if (req.file) {
      eventData.image = `/uploads/${req.file.filename}`;
    }
    
    // Convert string fields to appropriate types
    if (eventData.maxAttendees) {
      eventData.maxAttendees = parseInt(eventData.maxAttendees);
    }
    if (eventData.rating) {
      eventData.rating = parseFloat(eventData.rating);
    }
    if (eventData.tags) {
      eventData.tags = eventData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    }
    if (eventData.gallery) {
      eventData.gallery = eventData.gallery.split(',').map(url => url.trim()).filter(url => url);
    }
    if (eventData.isActive !== undefined) {
      eventData.isActive = eventData.isActive === 'true';
    }
    
    const event = await Event.findByIdAndUpdate(req.params.id, eventData, {
      new: true,
      runValidators: true
    });
    
    if (!event) {
      return res.status(404).send('Event not found');
    }
    
    res.send(event);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete event
router.delete('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).send('Event not found');
    }
    res.send(event);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
