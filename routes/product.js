const express = require('express');
const productController = require('../controller/product');
const router = express.Router();
const auth = require('../auth');

const {verify, verifyAdmin} = auth;

// add product route
router.post("/", verify,verifyAdmin, productController.addProduct);

// Search Products By Price Range
router.post('/searchByPrice', productController.searchProductsByPriceRange);

// get all products
router.get("/all", productController.getAllProducts);

// get all active products route
router.get("/", productController.getAllActive);

// retrieve a specific product route
router.get("/:productId", productController.getProduct);

// update product information route
router.put("/:productId", verify, verifyAdmin, productController.updateProduct);

// archive a product route
router.put("/:productId/archive", verify, verifyAdmin, productController.archiveProduct);

// activate a product route
router.put("/:productId/activate", verify, verifyAdmin, productController.activateProduct);

// Route to search for courses by course name
router.post("/search", productController.searchByProductName);


module.exports = router;