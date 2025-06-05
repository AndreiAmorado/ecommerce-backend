// Mongoose Dependency
const mongoose = require('mongoose')


// Schema/Blueprint
const cartSchema = new mongoose.Schema({
	

	userId: {
		type: String,
		required: [true, 'Id is required']
	},
	products: [{
		productId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product',
			required: [true, 'Products is required']
		},
		quantity:
		{
			type: Number,
			required: [true, 'Quantity is required']
		}
	}],
	totalAmount:
	{
		type: Number,
		required: [true, 'Amount is required']
	}
	});

module.exports = mongoose.model('Cart', cartSchema);