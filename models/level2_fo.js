const mongoose = require("mongoose");


const field_officer = new mongoose.Schema({
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


const fo = mongoose.model("TreasureHuntClue", field_officer);
module.exports = fo;
