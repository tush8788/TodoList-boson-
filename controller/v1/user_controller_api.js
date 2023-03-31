const UserDB = require('../../models/user');

//create user
module.exports.createUser =async function(req,res){
    try{
        // console.log(req.body)
        let user = await UserDB.findOne({email:req.body.email});

        if(!user){
            user = await UserDB.create({email:req.body.email,password:req.body.password});
            // console.log("user create Successfully");
            return res.status(201).json({
                message:"user create Successfully"
            })
        }
        else{
            return res.status(403).json({
                message:"user already exist just login"
            })
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

//create session
// module.exports.createSession = function(req,res){
//     // console.log("here")
//     req.flash('success',"Signin Successfully");
//     return res.redirect('/');
// }

