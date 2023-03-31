const mongoose = require('mongoose');
mongoose.set('strictQuery',false);

mongoose.connect(process.env.MONGO_URL||'mongodb://localhost/boson-todo-list');

const db = mongoose.connection;

db.on('error',()=>{
    console.log("Error In connet to DB");
})

db.once('open',()=>{
    console.log("Successfully Connect With DB");
})

module.exports = db;