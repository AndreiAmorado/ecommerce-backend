// Dependencies and Modules
const User = require("../models/User");
const bcrypt = require('bcrypt');
const auth=require('../auth');


module.exports.registerUser =(reqBody) =>{

	let newUser = new User({
		email: reqBody.email,
		mobileNo: reqBody.mobileNo,
		lastName: reqBody.lastName,
		firstName: reqBody.firstName,
		password: bcrypt.hashSync(reqBody.password, 10)
	})
	return newUser.save().then((user,error)=>{
		
		if(error){
			return false;
		
		}else{
			return true;
		}

	}).catch(err=>err)

};

module.exports.loginUser = (req,res)=>{
	return User.findOne({email: req.body.email}).then(result=>{
		// User does not exist.
		console.log(result)
		if(result == null){
			return false
		} else{
			// Created the isPasswordCorrect variable to return the result of comparing the login form password and the database password.
			// compareSync() method is used to compare the non-encrypted password from the login form to the encrypted password from the database.
				// will return either true or false.
			const isPasswordCorrect = bcrypt.compareSync(req.body.password,result.password);

			if(isPasswordCorrect){
				// Generate an access token
				// Used the "createAccessToken" method defined in the "auth.js"
				return res.send({access: auth.createAccessToken(result)})
			}
			else{
				return res.send(false);
			}
		}
	}).catch(err => res.send(err));
};

// Set a user as an admin

module.exports.updateAdmin = async(req,res)=>{
	try {
	    const { userId } = req.body;

	    // Find the user by ID
	    const user = await User.findById(userId);
	    if (!user) {
	      return res.status(404).json({ error: 'User not found' });
	    }

	    // Update the user as an admin
	    user.isAdmin = true;
	    await user.save();

	    res.status(200).json({ message: 'User updated as admin successfully' });
	  } catch (error) {
	    res.status(500).json({ error: 'Server error' });
	  }
	}


// Get user details

module.exports.getUserDetails =(req,res)=>{
	return User.findById(req.user.id).then(result=>{
		 
			result.password = ""
			return res.send(result)
		
		
	}).catch(err => res.send(err));
}

module.exports.checkEmailExists = (reqBody) => {
    return User.find({email: reqBody.email}).then(result => {

        // The "find" metho
        // returns a record if a match is found.
        if(result.length > 0) {
            return true; //"Duplicate email found"
        } else {
            return false;
        }
    })
};

// Function to reset the password
module.exports.resetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const { id } = req.user; // Extracting user ID from the authorization header

    // Hashing the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Updating the user's password in the database
    await User.findByIdAndUpdate(id, { password: hashedPassword });

    // Sending a success response
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

