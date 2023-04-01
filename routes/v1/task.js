const express = require('express');
const router = express.Router();
const passport = require('passport');
const taskControllerApi = require('../../controller/v1/task_controller_api');

//show all task
router.get('/all',passport.authenticate(
    'jwt',
    {session:false}
),taskControllerApi.allTask);

//create new task
router.post('/create',passport.authenticate('jwt',{session:false}),taskControllerApi.createTask);

//update task
router.post('/update/:id',passport.authenticate('jwt',{session:false}),taskControllerApi.updateTask);

//delete task
router.delete('/delete/:id',passport.authenticate('jwt',{session:false}),taskControllerApi.deleteTask);

module.exports=router;