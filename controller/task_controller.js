const TaskDB = require('../models/task');

//create task
module.exports.addTask=async function(req,res){
    try{
        let task = await TaskDB.create({
            task:req.body.taskName,
            category:req.body.category,
            dueDate:req.body.dueDate,
            user:req.body.userId
        });

        return res.redirect('back');
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

//delete task 
module.exports.deleteTask=async function(req,res){
    try{
        var task = await TaskDB.findById(req.params.id);
        // console.log(task ," ",task.user==req.user.id)
        if(!task || req.user.id != task.user){
            console.log("unable to delete task")
            return res.redirect('back');
        }
        //delete task
        await task.deleteOne();
        return res.redirect('back');
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}