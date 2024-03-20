const {Router}=require("express");

const{displayProfile}=require("../controllers/profile.controller");


const router=Router();

router.post("/",function (req,res,next){
    try{
        displayProfile(req,res);
    }
    catch(error){
        console.log("Error!!",error);
        res.status(500).json({error:"profile not displayed"})
    }
});

module.exports=router;