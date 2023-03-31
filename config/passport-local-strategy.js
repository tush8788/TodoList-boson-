const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserDB = require('../models/user');

passport.use(new localStrategy({
    usernameField:'email'
},async function(email,password,done){
    try{
        let user = await UserDB.findOne({email:email});

        if(!user || user.password != password){
            console.log("Invaild email or password");
            return done(null,false);
        }
        return done(null,user);
    }
    catch(err){
        console.log(err);
        return done(err);
    }
}));

passport.serializeUser((user,done){
    done(user.id);
})

passport.deserializeUser(async function(id,done){
    try{
        let user = await UserDB.findById(id);

        if(!user){
           return done(null);
        }

        return done(user);
    }
    catch(err){
        console.log(err);
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