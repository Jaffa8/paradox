const mongoose = require("mongoose");

const officerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  uid: {
    type: String,
    required: true
  },
  photoUrl: String,
  position: {
    type: String,
    enum: ["CONTROL", "FIELD"],
    required: true
  }
});

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true
  },
  teamCode: {
    type: String,
    required: true,
    unique: true
  },
  players: [{
    type: String,
    required: true
  }],
  controlOfficer: {
    type: officerSchema,
    required: true
  },
  fieldOfficer: {
    type: officerSchema,
    required: true
  },
  controlOfficerId: String,
  currQues: {
    type: Number,
    default: 0
  },
  fieldOfficerId: String,
  score: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Team", teamSchema);
