const { Router } = require("express");
const { unlockHint } = require("../controllers/leaderboard.controller");

const router = Router();

router.post("/unlockHint", unlockHint);


module.exports = router;