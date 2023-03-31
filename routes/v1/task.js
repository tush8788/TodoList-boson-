const express = require('express');
const router = express.Router();
const passport = require('passport');
const taskControllerApi = require('../../controller/v1/task_controller_api');

router.get('/all',passport.authenticate(
    'jwt',
    {session:false}
),taskControllerApi.allTask);

module.exports=router;