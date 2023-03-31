const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;
const UserDB = require('../models/user');

let options={
    jwtFromRequest : extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'secret'
}

passport.use(new jwtStrategy(options,async function(JwtPayload,done){
    try{
        // console.log(JwtPayload);
        let user = await UserDB.findById(JwtPayload._id);
        // console.log(user);
        if(user){
            return done(null,user);
        }
        return done(null,false);
    }
    catch(err){
        return done(err);
    }
}))

module.exports=passport;