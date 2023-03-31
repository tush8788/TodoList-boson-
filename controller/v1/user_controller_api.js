const UserDB = require('../../models/user');
const jwt = require('jsonwebtoken');

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

// create session
module.exports.createSession =async function(req,res){
    try{
        // console.log(req.body)
        let user = await UserDB.findOne({email:req.body.email});
        // console.log(user)

        if(!user || user.password != req.body.password){
            return res.status(401).json({
                message:"Invaild email or password"
            })
        }

        return res.status(200).json({
            message:"Successfully authenticate",
            JwtToken:jwt.sign(user.toJSON(),"secret",{expiresIn:1000*100*60})
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

