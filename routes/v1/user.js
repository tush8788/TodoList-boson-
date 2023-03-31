const express = require('express');
const router = express.Router();
const passport = require('passport');
const userControllerAPI = require('../../controller/v1/user_controller_api');

//create user
router.post('/create',userControllerAPI.createUser);

//create session
router.post('/create-session',userControllerAPI.createSession);

module.exports=router;