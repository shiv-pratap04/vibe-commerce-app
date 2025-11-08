const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  // We store the original product ID from the Product collection
  productId: { type: Number, required: true }, 
  title: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  quantity: { type: Number, default: 1 }
});

module.exports = mongoose.model('CartItem', CartItemSchema);