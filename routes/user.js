const express = require('express');
const router = express.Router();
const userController = require('../controller/user_controller');

//sign up page
router.get('/signup',userController.signup);

//create user
router.post('/create',userController.createUser);

//sign in page
router.get('/signin',userController.signin);

//create session


module.exports=router;