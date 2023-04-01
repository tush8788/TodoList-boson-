const express = require('express');
const router = express.Router();
const passport = require('passport');

// /user req send user file
router.use('/user',require('./user'));

// /task req send task file
router.use('/task',require('./task'));

module.exports=router;