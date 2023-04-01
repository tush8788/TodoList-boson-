const UserDB = require('../../models/user');
const jwt = require('jsonwebtoken');

//create user
module.exports.createUser =async function(req,res){
    try{
        //find user in DB
        let user = await UserDB.findOne({email:req.body.email});
        //user not found then create new user
        if(!user){
            user = await UserDB.create({email:req.body.email,password:req.body.password});
            return res.status(201).json({
                message:"user create Successfully"
            })
        }
        else{
            //if user already exist then just back
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
        //find user in db
        let user = await UserDB.findOne({email:req.body.email});
        //check user found or not 
        if(!user || user.password != req.body.password){
            //user not found or password not match
            return res.status(401).json({
                message:"Invaild email or password"
            })
        }
        //if user found or password match then create token
        return res.status(200).json({
            message:"Successfully authenticate",
            //create jsonwebtoken
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

