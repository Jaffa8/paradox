const Router=require("express");
const getAllPrizes=require("../controllers/prize.controller.js");

const router=Router();

router.post("/prizedisplay",getAllPrizes);

module.exports=router;