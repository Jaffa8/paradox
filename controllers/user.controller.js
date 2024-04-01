
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

    
    const existingUser = await ParadoxUser.findOne({ uid });

    if (existingUser) {
      return res.status(404).json({ message: "User already exists", success: false });
    }

   
    const newUser = new ParadoxUser({
      uid,
      name, 
      email: 
      roll,
      refCode,
      teamCode,
      teamName,
      image:displayPicture,
      currQues:1,
      score:0,
      level:1,
    });
  
   await newUser.save();

    return res.status(200).json({ message: "User profile created successfully", success: true });
  } catch (error) {
    console.error("Error creating user profile:", error);
    return res.status(500).json({ message: "Unable to create user profile", success: false });
  }
};

module.exports = { createUser };
