const jwt = require('jsonwebtoken');

// Use to sign and confirm if the token is recognized/can be authenticated by our server app.
const secret = "CourseBookingAPI";


// Token Creation

module.exports.createAccessToken = (user) =>{

	const data ={
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin		
	};

	return jwt.sign(data,secret, {});
}


// Token Verification

/*
	Analogy
		Receive the gift and open the lock using the secret key to verify if the sender(client who sends the request) is legitimate and if the gift was not tampered
*/

module.exports.verify = (req,res, next) =>{
	console.log(req.headers.authorization);
	// req.headers.authorization - contains sensitive data and especially our token.
	let token = req.headers.authorization;

	// This if statement will check if the token variable contains undefined or a proper jwt. If it is undefined, we will check the data type of the token with the type of keyword, then send the msssage back to the client.
	if(typeof token === "undefined"){
		return res.send({auth: "Failed. No Token received."})
	}else{
		console.log(token);
		token=token.slice(7,token.length);
		console.log(token)
		// The "Bearer" was sliced afterwards
	}


	// Token decryption
	jwt.verify(token, secret, function(err,decodedToken){
		if (err){
			return res.send({
				auth:"Failed",
				message: err.message
			})
		}else{
			console.log(decodedToken);
			req.user = decodedToken;
			next();
		}
	})

	}

	// verifyAdmin function
	module.exports.verifyAdmin = (req, res, next) =>{
		console.log(req.user)
		if(req.user.isAdmin){
			next();
		}else{
			return res.send({
				auth:"Failed",
				message: "Action Forbidden"
			})
		}
	}