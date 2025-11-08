const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const CartItem = require('../models/CartItem');

// --- Product Routes ---

// @route   GET /api/products
// @desc    Get all products
router.get('/products', async (req, res) => {
  try {
    let products = await Product.find();
    // If DB is empty, fetch from Fake Store API and populate our DB
    if (products.length === 0) {
      const response = await fetch('https://fakestoreapi.com/products?limit=10');
      const apiProducts = await response.json();
      
      // Re-map to match our schema (especially the 'id')
      const productsToSave = apiProducts.map(p => ({
        id: p.id,
        title: p.title,
        price: p.price,
        description: p.description,
        category: p.category,
        image: p.image,
        rating: p.rating,
      }));

      products = await Product.insertMany(productsToSave);
      console.log('Products populated from Fake Store API');
    }
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// --- Cart Routes ---

// @route   GET /api/cart
// @desc    Get all cart items
router.get('/cart', async (req, res) => {
  try {
    const cartItems = await CartItem.find();
    res.json(cartItems);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/cart
// @desc    Add an item to the cart (product body)
router.post('/cart', async (req, res) => {
  const { id, title, price, image } = req.body;

  try {
    // Check if item already in cart
    let item = await CartItem.findOne({ productId: id });

    if (item) {
      // If item exists, update quantity (as per assignment spec)
      item.quantity += 1;
      await item.save();
      res.json(item);
    } else {
      // If not, create new cart item
      // We use 'id' from the product as 'productId' in the cart
      const newItem = new CartItem({
        productId: id,
        title,
        price,
        image,
        quantity: 1
      });
      const savedItem = await newItem.save();
      res.json(savedItem);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/cart/:id
// @desc    Remove an item from the cart (using 'productId')
router.delete('/cart/:id', async (req, res) => {
  try {
    // We find by 'productId'
    const item = await CartItem.findOneAndDelete({ productId: parseInt(req.params.id) });
    if (!item) {
      return res.status(404).json({ msg: 'Item not found in cart' });
    }
    res.json({ msg: 'Item removed', removedItem: item });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/checkout
// @desc    Mock checkout process
router.post('/checkout', async (req, res) => {
    const { cartItems, totalAmount } = req.body;
    try {
        // In a real app, you'd process payment here.
        // For this mock, we just clear the cart.
        await CartItem.deleteMany({});
        
        // Return a mock receipt
        const receipt = {
            message: "Checkout Successful!",
            totalAmount: totalAmount,
            itemsPurchased: cartItems.length,
            timestamp: new Date().toISOString()
        };
        
        res.json(receipt);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;