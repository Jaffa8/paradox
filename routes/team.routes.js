const Router=require("express");
const router=Router();
const {join_team, create_team, team_details}=require("../controllers/team.controller.js");
router.post("/createteam",create_team);
router.post("/jointeam",join_team);
router.post("/teamdetails",team_details);

module.exports=router;