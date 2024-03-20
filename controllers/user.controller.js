const ParadoxUser = require("../models/paradoxUser.model");

const createUser = async (req, res) => {
  try {
    const {
      uid,
      name,
      email,
      roll,
      refCode,
      teamCode,
      teamName,
      displayPicture,
    } = req.body;

   
    let existingUser = await ParadoxUser.findOne({ uid });

    if (existingUser) {
      return res.status(200).json({ message: "User already exists", success: false });
    }

 
    const newUser = new ParadoxUser({
      uid,
      name,
      email,
      roll,
      refCode,
      isInTeam: false,
      teamCode,
      teamName,
      currQues: 1,
      image: displayPicture,
      score: 0,
      level: 1,
    });

   
    await newUser.save();

    return res.status(200).json({ message: "User created successfully", success: true });
  } catch (error) {
    return res.status(500).json({ message: "Unable to create user", success: false });
  }
};

module.exports = { createUser };
