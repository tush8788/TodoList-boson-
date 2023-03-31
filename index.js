const express = require('express');
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
const passport = require('passport');
const localStrategy = require('./config/passport-local-strategy');
const expressSession = require('express-session');
const mongoStore = require('connect-mongo');
const port = process.env.PORT||8000;

const app = express();

//set up ejs
app.set('view engine','ejs');
app.set('views','./views');
//set up express-ejs-layout style and script 
app.set('layout extractScripts',true);
app.set('layout extractStyles',true);

app.use(expressLayout);
//access static files
app.use(express.static('./assets'));

app.use(express.urlencoded({extended:false}));

//session cookie
app.use(expressSession({
    name:"bosonTODO",
    secret:"ANYKey",
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:1000*100*60
    },
    store:mongoStore.create({
        mongoUrl:process.env.MONGO_URL||'mongodb://localhost/boson-todo-list',
        autoRemove:false        
    },function(err){
        console.log(err||"connect");
    })
}))

//setup passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//handle urls
app.use('/',require('./routes/index.js'));

//listen
app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log(`Server is up on port ${port}`);
})