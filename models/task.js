const mongoose = require('mongoose');
//create schema 
const taskSchema = new mongoose.Schema({
    task:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    category:{
        type:String,
    },
    dueDate:{
        type:Date,
        required:true
    }
},{
    timestamps:true
});

const Task = mongoose.model('Task',taskSchema);

module.exports=Task;