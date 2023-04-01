const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;
const UserDB = require('../models/user');
//options 
let options={
    //convert jwt payload into normal and also check jwt token sign
    jwtFromRequest : extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'secret'
}
//passport middelware 
passport.use(new jwtStrategy(options,async function(JwtPayload,done){
    try{
        //find user in db
        let user = await UserDB.findById(JwtPayload._id);
        // if user is found 
        if(user){
            return done(null,user);
        }
        // user not found
        return done(null,false);
    }
    catch(err){
        return done(err);
    }
}))

module.exports=passport;