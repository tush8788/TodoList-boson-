const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserDB = require('../models/user');

//passport middelware
passport.use(new localStrategy({
    //set username fild  
    usernameField:'email',
    //we want req opject here 
    passReqToCallback:true
},async function(req,email,password,done){
    try{
        //find user in db
        let user = await UserDB.findOne({email:email});
        //check user is found or not and passwords match or not
        if(!user || user.password != password){
            req.flash("error","Invaild email or password")
            return done(null,false);
        }
        //every thing is good then 
        return done(null,user);
    }
    catch(err){
        console.log(err);
        return done(err);
    }
}));

//serialize user 
passport.serializeUser(function(user,done){
    try{
        done(null,user.id);
    }
    catch(err){
        console.log("inside ",err);
        done(err);
    }
})

//deserialize user
passport.deserializeUser(async function(id,done){
    try{
        let user = await UserDB.findById(id);

        if(!user){
           return done(null,false);
        }

        return done(null,user);
    }
    catch(err){
        console.log("inside:"+err);
        done(err);
    }
})

//check authentication
passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/user/signin');
}

//set Authenticated User in local
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    }
    return next();
}