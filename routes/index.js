const express = require('express');
const router = express.Router();
const passport = require('passport');
const homeController = require('../controller/home_controller');

router.get('/',passport.checkAuthentication,homeController.home);

router.use('/user',require('./user'));

router.use('/task',require('./task'));

router.use('/v1',require('./v1/index'));

module.exports=router;