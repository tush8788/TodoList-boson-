const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;
const UserDB = require('../models/user');

let options={
    jwtFromRequest : extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'secret'
}

passport.use(new extractJWT(options,async function(JwtPayload,done){
    try{
        let user = await UserDB.findOne({email:JwtPayload.id});
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