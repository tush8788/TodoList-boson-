const TaskDB = require('../models/task');

//create task
module.exports.addTask=async function(req,res){
    try{
        //create new task
        let task = await TaskDB.create({
            task:req.body.taskName,
            category:req.body.category,
            dueDate:req.body.dueDate,
            user:req.body.userId
        });
        //create notification
        req.flash('success','Task create successfully');
        
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
        //find task in db
        var task = await TaskDB.findById(req.params.id);
        //if task not found or user not match
        if(!task || req.user.id != task.user){
            req.flash('error','unable to delete task');
            return res.redirect('back');
        }
        //delete task
        await task.deleteOne();
        //notification
        req.flash('success','Task delete successfully');
        
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
        //find task in db
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
        //check user match or not match
        if(req.user.id != req.body.userId){
            //notification
            req.flash('error','User not match');
            return res.redirect('/');
        }
        // update task
        await TaskDB.findByIdAndUpdate(req.body.taskId,{
            task:req.body.taskName,
            category:req.body.category,
            dueDate:req.body.dueDate,
        });
        //notification
        req.flash('success','Task update successfully successfully');
        return res.redirect('/')
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}