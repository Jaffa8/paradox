const { Router } = require("express");
const { unlockHint } = require("../controllers/leaderboard.controller.js");

const router = Router();

router.post("/unlockHint", unlockHint);


module.exports = router;