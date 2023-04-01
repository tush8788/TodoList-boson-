const TaskDB = require('../../models/task');

//all tasks
module.exports.allTask= async function(req,res){
    try{
        //find user specific tasks
        let tasks=await TaskDB.find({user:req.user.id});
        // res
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
        //create new task
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
        //find task in DB
        let Task = await TaskDB.findById(req.params.id);
        //check user match or not
        if(Task.user == req.user.id){
            //user match then update
            await Task.updateOne(req.body);

            return res.status(200).json({
                message:"Update Successfully",
                
            })
        }
        else{
            //user not match
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
        //find task in db
        let task = await TaskDB.findById(req.params.id);
        //check user match or not
        if(task.user == req.user.id){
            //user match then delete task
            task.deleteOne();
            return res.status(200).json({
                message:"Task Delete Successfully"
            })
        }
        else{
            //user not match 
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