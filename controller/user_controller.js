const UserDB = require('../models/user');

//sign up page
module.exports.signup = function(req,res){
    //if user login then this page not visible to user
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    //user not login then
    return res.render('signup',{
        title:"Signup"
    })
}

//sign in page
module.exports.signin = function(req,res){
    //if user login then this page not visible to user
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    //user not login then
    return res.render('signin',{
        title:"Signin"
    })
}

//create user
module.exports.createUser =async function(req,res){
    try{
        //find user in db
        let user = await UserDB.findOne({email:req.body.email});
        //if user not found then create new
        if(!user){
            user = await UserDB.create({email:req.body.email,password:req.body.password});
            req.flash('success',"user create Successfully");
            return res.redirect('/user/signin');
        }
        else{
            //if user already exist in db then just back
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
    req.flash('success',"Signin Successfully");
    return res.redirect('/');
}

//signout
module.exports.signOut = function(req,res){
    //logout
    req.logout((err)=>{
        if(err){
            console.log(err);
        }
        req.flash('success',"Signout Successfully");
        return res.redirect('/user/signin');
    })
}