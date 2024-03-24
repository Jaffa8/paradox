const express = require("express");

const cors =require("cors");

const cookieParser=require("cookie-parser");


const app = express()


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())


//routes import
const authRouter = '../routes/auth.routes.js'
const  hintRouter = "../routes/hint.routes.js"
const  homePageRouter = "./routes/homePage.routes.js"
const leaderboardRouter = "./routes/leaderboard.routes.js"
const play_level1Router = "./routes/play_level1.routes.js"
const profileRouter = "./routes/profile.routes.js"


//routes declaration

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/hint", hintRouter)
app.use("/api/v1/home", homePageRouter)
app.use("/api/v1/leaderboard", leaderboardRouter)
app.use("/api/v1/level1", play_level1Router)
app.use("/api/v1/profile", profileRouter)




module.exports=app;
























