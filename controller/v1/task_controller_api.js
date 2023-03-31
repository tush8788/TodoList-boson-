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