const TeamModel = require("../models/team.model");
const ParadoxUserModel = require("../models/paradoxUser.model");




const create_team = async (req, res) => {
  try {
    const { uid, teamName } = req.body;
    const user = await ParadoxUserModel.findOne({ uid });

    if (!user) {
      return res.status(200).json({
        message: "User does not exist",
        success: false,
        data: {}
      });
    }

    if (user.isInTeam) {
      return res.status(200).json({
        message: "User already in a team",
        success: false,
        data: {}
      });
    }

    const teamCode = Math.floor(Math.random() * 9000) + 1000;

    const newTeam = new TeamModel({
      isInTeam: true,
      teamName,
      score: 0,
      teamCode,
      controlOfficer: {
        name: user.name,
        uid: user.uid,
        photoUrl: user.image,
        position: "CONTROL",
      },
      currQues: 1,
    });

    user.isInTeam = true;
    user.role = "CO";
    user.teamCode = teamCode;
    user.teamName = teamName;

    await user.save();
    await newTeam.save();

    return res.status(200).json({
      message: "Team Created",
      success: true,
      data: {
        isInTeam: true,
        teamName,
        teamCode,
        controlOfficer: newTeam.controlOfficer,
        fieldOfficer: newTeam.fieldOfficer,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
      data: {},
    });
  }
};




const join_team = async (req, res) => {
    try {
      const { uid, teamId } = req.body;
      const user = await ParadoxUserModel.findOne({ uid });
  
      if (!user) {
        return res.status(200).json({
          message: "User does not exist",
          success: false,
          data: {}
        });
      }
  
      if (user.isInTeam) {
        return res.status(200).json({
          message: "User already in a team",
          success: false,
          data: {}
        });
      }
  
      const team = await TeamModel.findOne({ teamCode: teamId });
  
      if (!team) {
        return res.status(200).json({
          message: "Team does not exist",
          success: false,
          data: {}
        });
      }
  
      user.isInTeam = true;
      user.role = "FO";
      user.teamCode = team.teamCode;
      user.teamName = team.teamName;
  
      await user.save();
  
      team.fieldOfficer = {
        name: user.name,
        uid: user.uid,
        photoUrl: user.image,
        position: "FIELD",
      };
  
      await team.save();
  
      return res.status(200).json({
        message: "Team Joined",
        success: true,
        data: {
          isInTeam: true,
          teamName: team.teamName,
          teamCode: team.teamCode,
          controlOfficer: team.controlOfficer,
          fieldOfficer: team.fieldOfficer,
        },
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        success: false,
        data: {},
      });
    }
  };
  
  

  const team_details = async (req, res) => {
    try {
      const { uid } = req.body;
      const user = await ParadoxUserModel.findOne({ uid });
  
      if (!user) {
        return res.status(200).json({
          message: "User does not exist.",
          success: false,
          data: {}
        });
      }
  
      if (user.isInTeam) {
        const team = await TeamModel.findOne({ teamCode: user.teamCode });
  
        return res.status(200).json({
          message: "User is in a team",
          success: true,
          data: {
            isInTeam: true,
            teamCode: team.teamCode,
            teamName: team.teamName,
            controlOfficer: team.controlOfficer,
            fieldOfficer: team.fieldOfficer,
          },
        });
      } else {
        return res.status(200).json({
          message: "User is not in a team",
          success: true,
          data: {
            isInTeam: false,
          },
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        success: false,
        data: {},
      });
    }
  };
  


module.exports = { join_team, create_team, team_details };
