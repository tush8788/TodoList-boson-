const express = require('express');
const router = express.Router();
const passport = require('passport');
const userControllerAPI = require('../../controller/v1/user_controller_api');

router.post('/create',userControllerAPI.createUser);

module.exports=router;