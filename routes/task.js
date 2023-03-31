const express = require('express');
const passport = require('passport');
const router = express.Router();
const taskController = require('../controller/task_controller');

//create task
router.post('/create',passport.checkAuthentication,taskController.addTask);

//delete task
router.get('/delete/:id',passport.checkAuthentication,taskController.deleteTask)
module.exports = router;