const express = require("express");

const cors =require("cors");

const cookieParser=require("cookie-parser");

const bodyParser = require('body-parser');



const app = express()


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())


//routes import
const authRouter = require("./routes/auth.routes.js");
const hintRouter = require('./routes/hint.routes.js');
const homePageRouter = require('./routes/homePage.routes.js');
const leaderboardRouter = require('./routes/leaderboard.routes.js');
const play_level1Router = require('./routes/play_level1.routes.js');
const profileRouter = require('./routes/profile.routes.js');
const prize_router=require("./routes/prizes.routes.js");
const team_router=require(".//routes/team.routes.js");
const question_router=require("./utils/ques_collector_api.js");

//routes declaration

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/hint", hintRouter)
app.use("/api/v1/home", homePageRouter)
app.use("/api/v1/leaderboard", leaderboardRouter)
app.use("/api/v1/level1", play_level1Router)
app.use("/api/v1/profile", profileRouter)
app.use("/api/v1/prize",prize_router);
app.use("/api/v1/team",team_router);
app.use("/api/v1/ques",question_router);

module.exports=app;













