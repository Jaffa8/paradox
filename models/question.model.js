const mongoose=require("mongoose");

const questionSchema=new mongoose.Schema({
    level:{
      type:Number,
    },
    id: {
       type: Number,
    },
    answer:{
     type:String,
     lowercase:true,   
    },
    image:{
        type:String,
    },
    question:{
        type:String,
    },
    hint: {
        type:String,
    },
    isHintAvailable:{
        type:Boolean,
        default:false,
    },
    category:{
        type:String,
    },
    count:{
        type:Number,
    } 

});

module.exports=mongoose.model("question",questionSchema);


