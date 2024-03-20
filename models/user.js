const mongoose = require("mongoose");

var validator = require('validator');



validator.isEmail('foo@bar.com'); //=> true


const UserSchema = new mongoose.Schema({
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
  });



  const User = mongoose.model("user", UserSchema);

module.exports = User;