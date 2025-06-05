const express = require('express');
const orderController = require('../controller/order');
const router = express.Router();
const auth = require('../auth');



const { verify, verifyAdmin } = auth;


router.post("/", verify, orderController.createOrder);

router.get("/getOrders",verify, orderController.getOrders);

router.get("/allOrders",verify, verifyAdmin, orderController.getAllOrders);

router.post("/checkOutFromCart", verify, orderController.checkOutFromCart);

module.exports = router; 