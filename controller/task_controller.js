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

//edit task page
module.exports.editTaskPage=async function(req,res){
    try{
        let task = await TaskDB.findById(req.params.id);
        return res.render("editTask",{
            title:"Edit Task",
            task:task
        });
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

//update task
module.exports.updateTask =async function(req,res){
    try{
        // console.log(req.body);
        if(req.user.id != req.body.userId){
            console.log("user not match");
            return res.redirect('/');
        }
        await TaskDB.findByIdAndUpdate(req.body.taskId,{
            task:req.body.taskName,
            category:req.body.category,
            dueDate:req.body.dueDate,
        });

        return res.redirect('/')
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}