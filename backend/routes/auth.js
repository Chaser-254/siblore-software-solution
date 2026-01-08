const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Check authentication
router.get('/check', auth, async (req, res) => {
  try {
    res.json({ 
      authenticated: true, 
      user: { 
        _id: req.user._id, 
        email: req.user.email 
      } 
    });
  } catch (error) {
    res.status(401).json({ authenticated: false });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // For demo purposes, accept any email with password "admin123"
    if (password === 'admin123') {
      const token = jwt.sign(
        { _id: 'demo-admin', email, role: 'admin' },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      res.json({
        token,
        user: { _id: 'demo-admin', email, role: 'admin' }
      });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;