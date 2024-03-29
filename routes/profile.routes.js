const {Router}=require("express");

const{displayProfile}=require("../controllers/profile.controller.js");


const router=Router();

router.post("/display",function (req,res,next){
    try{
        displayProfile(req,res);
    }
    catch(error){
        console.log("Error!!",error);
        res.status(500).json({error:"profile not displayed"})
    }
});

module.exports=router;