// Dependencies and Modules
const express = require('express');
const userController = require('../controller/user')
const router = express.Router();
const auth = require('../auth');

// destructured auth file:
const {verify, verifyAdmin} = auth;



router.post("/register",(req,res)=>{
	userController.registerUser(req.body).then(resultFromController=> res.send(resultFromController))
})

//login route
router.post("/login", userController.loginUser);

// Set admin route
 router.put('/update-admin', verify, verifyAdmin, userController.updateAdmin);

// get user details route
 router.get("/details",verify, userController.getUserDetails);

 router.post("/checkEmail", (req, res) => {
     userController.checkEmailExists(req.body).then(resultFromController => res.send(resultFromController));
 });

 // Route for resetting the password
 router.put('/reset-password', verify, userController.resetPassword);




module.exports = router;
