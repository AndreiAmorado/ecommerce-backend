const Order = require("../models/Order");
const Product = require('../models/Product');
const User = require('../models/User');
const Cart = require('../models/Cart');
const auth= require('../auth');

module.exports.addToCart = async (req, res) => {
  try {

    const { productId, quantity } = req.body;

    const userId = req.user.id

    if (req.user.isAdmin) {
      return res.status(401).send(false);
    }

    // Find or create cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, products: [], totalAmount: 0 });
    }

    // Fetch product price
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }

    const existingProduct = cart.products.find(p => p.productId.toString() === productId);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    // Recalculate totalAmount
    let total = 0;
    for (const item of cart.products) {
      const prod = await Product.findById(item.productId);
      if (prod) {
        total += item.quantity * prod.price;
      }
    }

    cart.totalAmount = total;

    await cart.save();
    console.log(cart);

    res.send(true);
  } catch (error) {
    console.error(error);
    res.status(500).send(false);
  }
};

// Get Cart for a user
module.exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    if (req.user.isAdmin) {
      return res.status(401).send(false);
    }

    const cart = await Cart.findOne({ userId }).populate('products.productId');
    if (!cart) {
      return res.status(404).send({ message: 'Cart not found' });
    }

    res.send(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send(false);
  }
};

// Delete Cart for a user
module.exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    if (req.user.isAdmin) {
      return res.status(401).send(false);
    }

    const result = await Cart.findOneAndDelete({ userId });

    if (!result) {
      return res.status(404).send({ message: 'Cart not found' });
    }

    res.send(true);
  } catch (error) {
    console.error(error);
    res.status(500).send(false);
  }
};
