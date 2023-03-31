const express = require('express');
const router = express.Router();
const userController = require('../controller/user_controller');

//sign up page
router.get('/signup',userController.signup);

//sign in page
router.get('/signin',userController.signin);

module.exports=router;