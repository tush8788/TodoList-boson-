const express = require('express');
const router = express.Router();
const passport = require('passport');
// home Controller
const homeController = require('../controller/home_controller');

//home page
router.get('/',passport.checkAuthentication,homeController.home);

//api infomation page
router.get('/api/page',homeController.apiPage);

// /user req send to user file 
router.use('/user',require('./user'));

// /task req send to task file 
router.use('/task',require('./task'));

// /v1 req send to v1 folder (API Req) 
router.use('/v1',require('./v1/index'));

module.exports=router;