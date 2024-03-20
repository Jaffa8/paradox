const mongoose=require("mongoose");

const prizeSchema=new mongoose.Schema({
    image:{
        type:String,
    }, 
    url: {
        type:String,
    },
    title: {
        type: String,
    },
    body: {
        type:String,
        }
    },{timestamps:true});

module.exports("Prize",prizeSchema);