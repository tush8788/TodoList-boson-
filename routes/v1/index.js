const express = require('express');
const router = express.Router();
const passport = require('passport');
// const Controller = require('../controller/home_controller');
router.use('/user',require('./user'));

module.exports=router;