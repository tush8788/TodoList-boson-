const TaskDB = require('../models/task');

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