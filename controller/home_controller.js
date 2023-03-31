const TaskDB = require('../models/task');
module.exports.home=async function(req,res){
    try{

        let tasks=await TaskDB.find({user:req.user.id});

        return res.render('home',{
            title:"Home",
            tasks:tasks
        })
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

//api page
module.exports.apiPage = function(req,res){
    return res.render('API',{
        title:"API"
    })
}