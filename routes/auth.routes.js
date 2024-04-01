const { Router } = require("express");
const { signup_post, login_post } = require("../controllers/auth.controller.js");
const { createUser } = require("../controllers/user.controller.js");

const router = Router();


router.post("/signup", signup_post);

router.post("/login", login_post);

router.post("/createUser", createUser);

module.exports = router;