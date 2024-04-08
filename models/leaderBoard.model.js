const mongoose = require("mongoose");

const LeaderBoardSchema = new mongoose.Schema({
  user: { 
    type: String,
     title: User
     },
  name: { 
    type: String, 
    title: Name
   },
  image: { 
    type: String,
     title: Image
     },
  level: {
     type: Number
     },
  attempts: {
    type:Number,
  },
  score:{ 
    type:Number,
  },
  coins: {
    type:Number,
  },
  refferal_availed:{
    type:Boolean,
}
},{timestamps:true});

module.exports = mongoose.model("LeaderBoard", LeaderBoardSchema);
