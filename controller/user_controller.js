const UserDB = require('../models/user');

//sign up page
module.exports.signup = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('signup',{
        title:"Signup"
    })
}

//sign in page
module.exports.signin = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('signin',{
        title:"Signin"
    })
}

//create user
module.exports.createUser =async function(req,res){
    try{
        // console.log(req.body)
        let user = await UserDB.findOne({email:req.body.email});

        if(!user){
            user = await UserDB.create({email:req.body.email,password:req.body.password});
            // console.log("user create Successfully");
            req.flash('success',"user create Successfully");
            return res.redirect('/user/signin');
        }
        else{
            req.flash('error',"user already exist");
            console.log("user already exist just login");
            return res.redirect('/user/signin');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

//create session
module.exports.createSession = function(req,res){
    // console.log("here")
    req.flash('success',"Signin Successfully");
    return res.redirect('/');
}

//signout
module.exports.signOut = function(req,res){
    req.logout((err)=>{
        if(err){
            console.log(err);
        }
        req.flash('success',"Signout Successfully");
        return res.redirect('/user/signin');
    })
}