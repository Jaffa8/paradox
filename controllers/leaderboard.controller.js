const ParadoxUser = require("../models/paradoxUser.model.js");
const TeamModel = require("../models/team.model.js");

const displayLeaderBoard = async (req, res) => {
  try {
    const { uid } = req.body;
    const leaderboard = await ParadoxUser.find().sort({ score: -1 }).exec();
    const user = await ParadoxUser.findOne({ uid }).exec();

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const userPosition = await ParadoxUser.countDocuments({ score: { $gte: user.score } });

    const myRank = {
      user_id: user.uid,
      user_name: user.name,
      rank: userPosition,
      score: user.score,
      display_picture: user.image,
    };

    return res.status(200).json({
      success: true,
      message: "Leaderboard fetched",
      data: { myRank, leaderboard },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};



const displayLevel2LeaderBoard = async (req, res) => {
  try {
    const { uid } = req.body;
    const leaderboard = await TeamModel.find().sort({ score: -1 }).exec();
    const teamLeaderboard = leaderboard.map(team => ({
      user_id: team._id,
      user_name: team.teamName,
      rank: team.teamPosition,
      score: team.score,
      display_picture: team.controlOfficer.photoUrl,
    }));

    const user = await ParadoxUser.findOne({ uid });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (!user.teamCode) {
      return res.status(200).json({ success: true, message: "User not in a team", data: { leaderboard: teamLeaderboard } });
    }

    const team = await TeamModel.findOne({ teamCode: user.teamCode });

    if (!team) {
      return res.status(404).json({ success: false, message: "Team does not exist", data: { leaderboard: teamLeaderboard } });
    }

    const teamPosition = await TeamModel.countDocuments({ score: { $gte: team.score } });

    const myRank = {
      user_id: team._id,
      user_name: team.teamName,
      rank: teamPosition,
      score: team.score,
      display_picture: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fi.stack.imgur.com%2F34AD2.jpg&tbnid=5ucjAVy0-StheM&vet=12ahUKEwjhhdjo8YKFAxVRTmwGHZa3C5kQMygAegQIARBk..i&imgrefurl=https%3A%2F%2Fstackoverflow.com%2Fquestions%2F38576264%2Fhow-can-i-programmatically-check-if-a-google-users-profile-picture-isnt-defaul&docid=X8JaXF6sFzBNAM&w=240&h=240&q=default%20google%20profile%20picture&ved=2ahUKEwjhhdjo8YKFAxVRTmwGHZa3C5kQMygAegQIARBk",      // link to be asked
    };

    return res.status(200).json({
      success: true,
      message: "Leaderboard loaded",
      data: { myRank, leaderboard: teamLeaderboard },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = { displayLeaderBoard, displayLevel2LeaderBoard };
