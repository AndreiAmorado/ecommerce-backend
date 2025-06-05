const express = require('express');
const cartController = require('../controller/cart');
const router = express.Router();
const auth = require('../auth');
const { verify, verifyAdmin } = auth;



router.post("/addToCart", verify, cartController.addToCart);
router.get("/getCart", verify, cartController.getCart);
router.delete("/clearCart", verify, cartController.clearCart);


module.exports = router;