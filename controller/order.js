const Order = require("../models/Order");
const Product = require('../models/Product');
const User = require('../models/User');
const Cart = require('../models/Cart');

// Creating Orders
module.exports.createOrder = async (req, res) => {
  try {
    const { userId, products } = req.body;

    // Validate if the user exists and is not an admin
    const user = await User.findById(userId);
    if (!user || user.isAdmin) {
      return res.json(false);
    }

    const orderedProducts = [];
    let totalAmount = 0;

    for (const product of products) {
      const foundProduct = await Product.findById(product.productId);
      if (!foundProduct) {
        return res.json(false);
      }

      const orderedProduct = {
        productId: product.productId,
        quantity: product.quantity,
        
      };

      orderedProducts.push(orderedProduct);
      totalAmount += foundProduct.price * product.quantity;
    }

    // Create the order
    const order = new Order({
      userId,
      products: orderedProducts,
      totalAmount,
    });

    const savedOrder = await order.save();
    res.json(true);
  } catch (error) {
    res.json(false);
  }
};

// Getting user details of orders
module.exports.getOrders = (req, res) => {
  const userId = req.user.id; // Assuming req.user.id is the ID of the user

  Order.find({ userId })
    .then(orders => {
      res.send(orders);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
};

// Retrieve all orders
module.exports.getAllOrders = (req, res) => {
	return Order.find({}).then(result => {
		console.log(result)
		return res.send(result);
	})
		.catch(err => res.send(err)) 
};

module.exports.checkOutFromCart = async (req, res) => {
  try {
    const userId = req.user.id;

    if (req.user.isAdmin) {
      return res.status(401).send(false);
    }

    // Find the user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart || cart.products.length === 0) {
      return res.status(400).send({ message: 'Cart is empty' });
    }

    // Optional: Validate product availability & recalculate total to be safe
    let totalAmount = 0;
    for (const item of cart.products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).send({ message: `Product with ID ${item.productId} not found` });
      }
      totalAmount += product.price * item.quantity;
    }

    // Create the order
    const newOrder = new Order({
      userId,
      products: cart.products,
      totalAmount
    });

    await newOrder.save();

    await Cart.findOneAndDelete({ userId });

    res.status(201).send({ message: 'Checkout successful', order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).send(false);
  }
};
