const { Router } = require("express");
const {
  displayLeaderBoard,
  displayLevel2LeaderBoard,
} = require("../controllers/leaderboard.controller.js");

const router = Router();

router.post("/", displayLeaderBoard);
router.post("/level2", displayLevel2LeaderBoard);

module.exports = router;