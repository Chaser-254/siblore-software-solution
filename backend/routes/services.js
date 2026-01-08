const express = require('express');
const Service = require('../models/Service');
const auth = require('../middleware/auth'); // Assume middleware exists
const upload = require('../middleware/upload');
const router = express.Router();

// Get all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find({});
    res.send(services);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Create service (Admin only)
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const serviceData = { ...req.body };
    
    // If image was uploaded, use its path
    if (req.file) {
      serviceData.image = `/uploads/${req.file.filename}`;
    }
    
    const service = new Service(serviceData);
    await service.save();
    res.status(201).send(service);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update service
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const serviceData = { ...req.body };
    
    // If image was uploaded, use its path
    if (req.file) {
      serviceData.image = `/uploads/${req.file.filename}`;
    }
    
    const service = await Service.findByIdAndUpdate(req.params.id, serviceData, {
      new: true,
      runValidators: true
    });
    
    if (!service) {
      return res.status(404).send('Service not found');
    }
    
    res.send(service);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete service
router.delete('/:id', auth, async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).send();
    res.send(service);
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;