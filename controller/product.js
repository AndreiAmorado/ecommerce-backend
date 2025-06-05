const Product = require("../models/Product");

// Search By Price
module.exports.searchProductsByPriceRange = async (req, res) => {
    try {
      const { minPrice, maxPrice } = req.body;
 
         // Find courses within the price range
      const products = await Product.find({
       price: { $gte: minPrice, $lte: maxPrice }
     });

     res.status(200).json({ products });
   } catch (error) {
     res.status(500).json({ error: 'An error occurred while searching for courses' });
   }
  };


// Add products
module.exports.addProduct =(req,res)=>{
	let newProduct = new Product({
		name: req.body.name,
		description: req.body.description,
		price: req.body.price,
		imgUrl: req.body.imgUrl 

	})
	return newProduct.save().then((product,error)=>{
		
		if(product){
			return res.send(true);
		
		}else{
			return res.send(false);
		}
		// catch() code block will handle other kinds of error.
		// prevents our app from crashing when an error occured in the backend server.
	}).catch(error=>res.send(error));
	};


// Retrieve all products
module.exports.getAllProducts = (req, res) => {
	return Product.find({}).then(result => {
		console.log(result)
		return res.send(result);
	})
		.catch(err => res.send(err)) 
};

// Get all active products
module.exports.getAllActive = (req, res) => {
	return Product.find({ isActive: true }).then(result => {
		console.log(result)
		return res.send(result)
	})
	.catch(err => res.send(err))
};


// Retrieve a specific product
module.exports.getProduct = (req, res) => {
	return Product.findById(req.params.productId).then(result => {
		console.log(result)
		return res.send(result)
	})
	.catch(err => res.send(err))
};

// Update a product information
module.exports.updateProduct = (req, res) => {

	let updateProduct = {
		name: req.body.name,
		description: req.body.description,
		price: req.body.price,
		imgUrl: req.body.imgUrl
	}


	return Product.findByIdAndUpdate(req.params.productId, updateProduct).then((product, error) => {

		
		if(error) {
		return res.send(false);

		} else {
		return res.send(true);
		}

	}) 
	.catch(err => res.send (err))
};


// Archive a product
module.exports.archiveProduct =(req,res)=>{
		let archivedProduct ={
			isActive:false
		}

	return Product.findByIdAndUpdate(req.params.productId, archivedProduct).then((product,error)=>{

		if(error) {
			return res.send(false)
		}
		else{
			
			return res.send(true)
		}
		
	}).catch(err =>res.send(err))

};

// Activate a product

module.exports.activateProduct =(req,res)=>{
	let activatedProduct ={
		isActive:true
	}

	return Product.findByIdAndUpdate(req.params.productId, activatedProduct).then((product,error)=>{


		if(error) {
			return res.send(false)
		}
		else{
			return res.send(true)
		}
		
	}).catch(err =>res.send(err))

};

module.exports.searchByProductName = async (req, res) => {
  try {
    const { name } = req.body;
    const products = await Product.find({
      name: { $regex: name, $options: "i" },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error searching for products" });
  }
};



