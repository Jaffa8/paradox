const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  redirectLink:{
    type:String,
  }, 
  imageUrl: {
    type:String,
  },
  id: {
    type:String,
  },
},{timestamps:true});

module.exports = mongoose.model("Banner", bannerSchema);