// Mongoose Dependency
const mongoose = require('mongoose')


// Schema/Blueprint
const productSchema = new mongoose.Schema({
	
	name: {
		type: String,
		required: [true, 'Name is required']
	},
	description: {
		type: String,
		required: [true, 'Description is required']
	},
	price: {
		type: Number, 
		required: [true, 'Price is required']
	},
	isActive: {
		type: Boolean, 
		default: true
	},
	createdOn: {
		type: Date,
		default: new Date()
	},
	imgUrl: {
		type: String,
		required: [true, "imgUrl is required"]
	}

});

module.exports = mongoose.model('Product', productSchema);