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


























const bodyParser = require("body-parser");

require ('dotenv').config();

const mongoose=require("mongoose");

const verify = require("./middleware/authMiddleware.js");
const homeController = require("./controllers/homePage.controller.js");

const authRoutes=require("./routes/auth.routes.js");




const port=3000;

const start = async ()=> {
    try{
        await connectDB(process.env.MONGO_URI) 
         app.listen(port,console.log("Running"))
    } catch (error){
       console.log("NOt working");
    }
}


app.use(bodyParser.json());


app.post("/home", function (req, res) {
    verify.verifyJWT(req, res, function(err) {
        if (err) {
            return res.status(500).send("Error!!");
        }
        
        verify.verifyJWT(req, res, function(err) {
            if (err) {
                return res.status(500).send("Error verifying");
            }
            
            homeController.homePage(req, res);
        });
    });
});



const authenticate = [verify.verifyJWT];


app.use("/auth", authenticate, authRoutes)


app.listen(port);
