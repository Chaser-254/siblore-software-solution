const express = require('express');
const Contract = require('../models/Contract');
const auth = require('../middleware/auth');
const router = express.Router();

// Create signed contract (Public)
router.post('/', async (req, res) => {
  try {
    const contract = new Contract(req.body);
    await contract.save();
    res.status(201).send(contract);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all contracts (Admin only)
router.get('/', auth, async (req, res) => {
  try {
    const contracts = await Contract.find({}).sort({
      createdAt: -1
    });
    res.send(contracts);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get contract by ID
router.get('/:id', async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);
    if (!contract) return res.status(404).send();
    res.send(contract);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update contract status (Admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const contract = await Contract.findByIdAndUpdate(req.params.id, {
      status: req.body.status,
      depositPaid: req.body.depositPaid
    }, {
      new: true
    });
    if (!contract) return res.status(404).send();
    res.send(contract);
  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = router;