const express = require('express');
const router = express.Router();
const passport = require('passport');
//user controller
const userController = require('../controller/user_controller');

//sign up page
router.get('/signup',userController.signup);

//create user
router.post('/create',userController.createUser);

//sign in page
router.get('/signin',userController.signin);

//create session
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/user/signin'}
),userController.createSession);

//signout
router.get('/signout',userController.signOut);

module.exports=router;