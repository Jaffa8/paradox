const express = require("express");
const bodyParser = require("body-parser");

const verify = require("./middleware/authMiddleware.js");
const homeController = require("./controllers/homePage.controller.js");

const app = express();


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



const authenticate = [hashVerifier.base64Decoder, hashVerifier.sha3HashVerifier];


app.use("/auth", authenticate, authRoutes)


app.listen(3000);
