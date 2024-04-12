const ParadoxUser=require("../models/paradoxUser.model.js");

const displayProfile= async(req,res)=>{
  try{
    const {uid}=req.body;
    const user=await ParadoxUser.findOne({uid});

    if(!user){
     return res.status(404).json({
      message:"User not found",success:false
     })
    }
    const userPosition = await ParadoxUser.countDocuments({ score: { $gte: user.score } });

   
    const userObject={
      name: user.name,
      uid: user.uid,
      displayPicture: user.image,
      roll: user.roll,
      ref_code: user.refCode,
      team_code: user.teamCode,
      level: user.level,
      teamName: user.teamName,
      coins: user.coins,
      attempts: user.currQues - 1,
      score: user.score,
      userPosition,
      rank:user.rank
    };
    
    res.json({message:"User found",success:true,data:userObject});
  }
  catch(error){
    console.log("Error retrieving user profile",error);
    res.status(500).json({error:"Internal server error"});
  }
};

module.exports={displayProfile};