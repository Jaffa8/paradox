const mongoose = require("mongoose");


const commanding_officer = new mongoose.Schema({
  level: {
    type: Number,
    required: true
  },
  Id: {
    type: Number,
    required: true,
    unique: true
  },
  answer: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    default: null
  },
   question: {
    type: String,
    required: true
  },
  hint: {
    type: String,
    default: null
  },
  category: {
    type: String,
    required: true
  },
  requiresAnswer: {
    type: Boolean,
    default: true
  },
  hasHint: {
    type: Boolean,
    default: true
  }
},{timestamps:true});


const co = mongoose.model("TreasureHuntClue", commanding_officer);
module.exports = co;
