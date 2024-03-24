const express = require("express");
const bodyParser = require("body-parser");

require ('dotenv').config();

const mongoose=require("mongoose");

const verify = require("./middleware/authMiddleware.js");
const homeController = require("./controllers/homePage.controller.js");

const authRoutes=require("./routes/auth.routes.js");

const app = express();


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
    verify.base64Decoder(req, res, function(err) {
        if (err) {
            return res.status(500).send("Error decoding Base64 data");
        }
        
        verify.sha3HashVerifier(req, res, function(err) {
            if (err) {
                return res.status(500).send("Error verifying");
            }
            
            homeController.homePage(req, res);
        });
    });
});



const authenticate = [verify.base64Decoder, verify.sha3HashVerifier];


app.use("/auth", authenticate, authRoutes)


app.listen(port);
