const express = require('express');
const expressLayout = require('express-ejs-layouts');
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

//handle urls
app.use('/',require('./routes/index.js'));

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log(`Server is up on port ${port}`);
})