const TaskDB = require('../../models/task');

//all tasks
module.exports.allTask= async function(req,res){
    try{
        // console.log(req.user)
        let tasks=await TaskDB.find({user:req.user.id});
        return res.status(200).json({
            message:"All Tasks",
            Tasks:tasks
        })
    }
    catch(err){
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}

//create task
module.exports.createTask = async function(req,res){
    try{
        let task = await TaskDB.create({
            task:req.body.task,
            category:req.body.category,
            user:req.user.id,
            dueDate:req.body.dueDate
        });

        return res.status(200).json({
            message:"Task Create Successfully",
            Task:task
        })

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}

//update task
module.exports.updateTask = async function(req,res){
    try{
        let Task = await TaskDB.findById(req.params.id);
        if(Task.user == req.user.id){

           await Task.updateOne(req.body);

            // await TaskDB.Update(req.params.id,req.body);

            return res.status(200).json({
                message:"Update Successfully",
                
            })
        }
        else{
            return res.status(401).json({
                message:"Unauthorized to update task"
            })
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}

//delete task
module.exports.deleteTask =async function(req,res){
    try{
        let task = await TaskDB.findById(req.params.id);
        if(task.user == req.user.id){
            task.deleteOne();
            return res.status(200).json({
                message:"Task Delete Successfully"
            })
        }
        else{
            return res.status(401).json({
                message:"Unauthorized to delete task"
            })
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}