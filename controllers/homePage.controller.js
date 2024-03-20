const Level = require("../models/level.model");
const Banner = require("../models/banner.model");
const ParadoxUser = require("../models/paradoxUser.model");

const levels = [
  {
    id: 1,
    start: 1681533000000,
    end: 1681583400000
  },
  {
    id: 2,
    start: 1681633680000,
    end: 1681655400000
  }
];

const homePage = async (req, res) => {
  const { uid } = req.body;
  const currTime = Date.now();
  const player = await ParadoxUser.findOne({ uid: uid });
  const leaderboard = await ParadoxUser.find().sort({ score: -1 }).limit(3).exec();
  const bannerList = await Banner.find();

  let activeLevel = null;

  for (const level of levels) {
    if (currTime >= level.start && currTime <= level.end) {
      activeLevel = level;
      break;
    }
  }

  if (!activeLevel) {
    return res.status(200).json({
      success: true,
      message: "No active level currently.",
      data: {
        playerName: player.name,
        isSolo: !player.isInTeam,
        teamName: player.teamName,
        isLevelLocked: true,
        nextQuestionNumber: player.currQues,
        levelData: null,
        leaderboardTop: leaderboard,
        bannerList: bannerList
      }
    });
  }

  const levelStartsIn = activeLevel.start - currTime;
  const isLevelActive = currTime >= activeLevel.start && currTime <= activeLevel.end;

  
  const levelInfo = await Level.findOne({ id: activeLevel.id });

  return res.status(200).json({
    success: true,
    message: `Level ${activeLevel.id} is ${isLevelActive ? '' : 'not '}active.`,
    data: {
      playerName: player.name,
      isSolo: !player.isInTeam,
      teamName: player.teamName,
      isLevelLocked: !player.isInTop,
      nextQuestionNumber: player.currQues,
      levelData: {
        levelNo: activeLevel.id,
        isLevelActive: isLevelActive,
        levelStartsInSeconds: levelStartsIn / 1000,
        levelStartsAt: activeLevel.start,
        levelEndsAt: activeLevel.end,
        levelInfo: levelInfo 
      },
      leaderboardTop: leaderboard,
      bannerList: bannerList
    }
  });
};

module.exports = { homePage };
