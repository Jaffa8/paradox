
const ParadoxUser = require("../models/paradoxUser.model");

const createUser = async (req, res) => {
  try {
    const {
      uid,
      name,
      email,
      roll,
     
      displayPicture,
    } = req.body;

    
    const existingUser = await ParadoxUser.findOne({ uid });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found", success: false });
    }

   
    const userProfile = {
     
      name: name,
      email: email,
      roll: roll,
      refCode: refCode,
      teamCode: teamCode,
      teamName: teamName,
      displayPicture: displayPicture,
    };

   
    existingUser.profile = userProfile;
    await existingUser.save();

    return res.status(200).json({ message: "User profile created successfully", success: true });
  } catch (error) {
    console.error("Error creating user profile:", error);
    return res.status(500).json({ message: "Unable to create user profile", success: false });
  }
};

module.exports = { createUser };
