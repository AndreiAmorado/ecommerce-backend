const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: [true, 'Id is required']
		},
	products: [{
		productId: {
			type: String,
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
},
{
	timestamps:true
});

module.exports = mongoose.model('Order', orderSchema);



