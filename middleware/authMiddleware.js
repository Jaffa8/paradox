const User= require("../models/user.model");

const jwt=require("jsonwebtoken");

const verifyJWT= async (req,res,next)=>{
try{
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")

    console.log(token);

    if(!token){
        throw new Error(401,"Unauthorized request")
    }

    const decodedToken = jwt.verify(token,process.env.JWT_SECRET)

    const user=await User.findById(decodedToken?._id).select("-password -refreshToken");

    if(!user){
        throw new Error(401,"Invalid Access Token")
    }
    req.user=user;
    next()
}
catch(error){
    throw new Error({message:"Invalid access Token"})
}
};


module.exports = {verifyJWT};