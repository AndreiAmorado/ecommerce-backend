// Dependencies and Modules
const express = require('express');
const userController = require('../controller/user')
const router = express.Router();
const auth = require('../auth');

// destructure the auth file:
// here we use the verify and verifyAdmin as auth middlewares.
const {verify, verifyAdmin} = auth;



router.post("/register",(req,res)=>{
	userController.registerUser(req.body).then(resultFromController=> res.send(resultFromController))
})

// Here we have the streamlined the login routes by directly invoking the "loginUser" function consiquently, the req.body will now be incorporated into the controller function.
router.post("/login", userController.loginUser);

// Set admin route
 router.put('/update-admin', verify, verifyAdmin, userController.updateAdmin);

// Get user details
 router.get("/details",verify, userController.getUserDetails);

 router.post("/checkEmail", (req, res) => {
     userController.checkEmailExists(req.body).then(resultFromController => res.send(resultFromController));
 });

 // Route for resetting the password
 router.put('/reset-password', verify, userController.resetPassword);




module.exports = router;