const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserDB = require('../models/user');

passport.use(new localStrategy({
    usernameField:'email',
    passReqToCallback:true
},async function(req,email,password,done){
    try{
        let user = await UserDB.findOne({email:email});

        if(!user || user.password != password){
            req.flash("error","Invaild email or password")
            // console.log("Invaild email or password");
            return done(null,false);
        }
        return done(null,user);
    }
    catch(err){
        console.log(err);
        return done(err);
    }
}));

passport.serializeUser(function(user,done){
    try{
        done(null,user.id);
    }
    catch(err){
        console.log("inside ",err);
        done(err);
    }
})

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