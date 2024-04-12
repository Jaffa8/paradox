const ParadoxUser = require("../models/paradoxUser.model");


const update = async (req, res) => {
  try {
    const leaderboard = await ParadoxUser.find().sort({ score: -1 }).limit(50);
    res.status(200).send({
      leaderboard: leaderboard,
    });

    // Update isInTop property for each user in the top 50 leaderboard
    for (const item of leaderboard) {
      item.isInTop = true;
      await item.save();
    }
  } catch (error) {
    console.error("Error updating leaderboard:", error);
    res.status(500).send("Error updating leaderboard");
  }
};

module.exports = { update };
