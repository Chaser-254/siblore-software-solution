const express = require('express');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Create product (Admin only)
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const productData = { ...req.body };
    
    // If image was uploaded, use its path
    if (req.file) {
      productData.image = `/uploads/${req.file.filename}`;
    }
    
    // Convert string fields to appropriate types
    if (productData.rating) {
      productData.rating = parseFloat(productData.rating);
    }
    if (productData.inStock !== undefined) {
      productData.inStock = productData.inStock === 'true';
    }
    
    const product = new Product(productData);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update product
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const productData = { ...req.body };
    
    // If image was uploaded, use its path
    if (req.file) {
      productData.image = `/uploads/${req.file.filename}`;
    }
    
    // Convert string fields to appropriate types
    if (productData.rating) {
      productData.rating = parseFloat(productData.rating);
    }
    if (productData.inStock !== undefined) {
      productData.inStock = productData.inStock === 'true';
    }
    
    const product = await Product.findByIdAndUpdate(req.params.id, productData, {
      new: true,
      runValidators: true
    });
    
    if (!product) {
      return res.status(404).send('Product not found');
    }
    
    res.send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete product
router.delete('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
