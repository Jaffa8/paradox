const mongoose= require("mongoose");

const {isEmail}=require("validator");

const bcrypt=require("bcrypt");

const userSchema=new mongoose.Schema({

email:{
  type:String,
  required:[true,"Email required"],
  unique:true,
  lowercase:true,
  validate:[isEmail,"Please enter a valid email"],
},
password:{
  type:String,
  required:true,
  min:[6,"Min 6 characters"],
}
},{timestamps:true})
module.exports=mongoose.model('User',userSchema);



