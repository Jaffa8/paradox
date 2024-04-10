const mongoose = require("mongoose");

const ParadoxUserSchema = new mongoose.Schema({
  uid: String,
  name: String,
  email: {
    type: String,
    unique: true,
  },
  unlockedHints: [String],
  role: String,
  image: String,
 
  score: {
    type:Number,
    default:0,
  },
  isInTeam: Boolean,
  level: Number,
  attempts: Number,
  currQues:{
 type:Number,
  }, 
  refCode: String,
  teamCode: String,
  teamName: String,
  isSolo: Boolean,
  isInTop: Boolean,
  isLevelLocked: Boolean,
  nextQuestionNumber: Number,
  roll: String,
  coins: String,
  rank: String,
},
{timestamps:true});

module.exports = mongoose.model("paradoxUser", ParadoxUserSchema);