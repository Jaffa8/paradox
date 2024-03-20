const mongoose=require("mongoose");

const levelSchema=new mongoose.Schema({
    id:{
        type:Number,
    }, 
    level:{
     type:Number,
    },
    isLevelActive:{
        type:Boolean,
    } ,
    levelStartsInSeconds:{
        type: Number,
    },
    levelStartsAt:{
        type:Number,
    } 
},{timestamps:true});

module.exports("Level",levelSchema)