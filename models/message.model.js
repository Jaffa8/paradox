const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  message: {
    type:String,
  }
},{timestamps:true});

module.exports = mongoose.model("Level", messageSchema);