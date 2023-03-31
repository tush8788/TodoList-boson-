const express = require('express');
const passport = require('passport');
const router = express.Router();
const taskController = require('../controller/task_controller');

router.post('/create',passport.checkAuthentication,taskController.addTask);

module.exports = router;