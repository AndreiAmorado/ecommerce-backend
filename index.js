// Server dependencies
const express = require ('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require("./routes/user")
const productRoutes = require("./routes/product")
const orderRoutes = require("./routes/order")
const cartRoutes = require("./routes/cart")

// Server Setup
const app = express();

// Environment Setup
const port = 4000;

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}));




// Allows all resources(frontend app) to access our backend application
app.use(cors());

// Mongoose Connection
mongoose.connect("mongodb+srv://andreivonnn:admin123@batch295.qxszxlq.mongodb.net/Capstone-2?retryWrites=true&w=majority",
			{
				useNewUrlParser: true,
				useUnifiedTopology:true

			}



	);

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error'));
db.once('open',() => console.log('Connected to MongoDB Atlas.'))
// Backend Routes
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/carts", cartRoutes);

// Server Gateway Response
if(require.main === module){
	app.listen(process.env.PORT || port,()=>{ console.log(`Server is now running in port ${process.env.PORT || port}.`)})
}

module.exports = {app,mongoose};