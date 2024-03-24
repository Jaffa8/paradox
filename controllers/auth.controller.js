const User=require("../models/user.model.js");

const jwt=require("jsonwebtoken");



const generateAccessAndRefreshTokens = async(userId)=>{
    try{
        const user= await User.findById(userId);
        const accessToken= user.generateAccessToken();
        const refreshToken= user.generateRefreshToken();
        user.refreshToken=refreshToken
        await user.save({ validateBeforeSave: false });
        return {accessToken, refreshToken}


    } catch (error) {
        throw new Error(500, "Something went wrong")
    }
}
    

const signup_post=async(req,res)=>{
    
        const{email,password}=req.body;
    
    if(!password){
     throw new Error("Password is required");
    } 
   const existedUser=await User.findOne({
    $or: [{email}]
   })
   if(existedUser){
    throw new Error(409,"User with same email already exists")
   }
   const user=await User.create({
    email,
    password,
   })
   const createdUser= await User.findById(user._id).select(
    "-password -refreshToken"
   )
   if(!createdUser){
    throw new Error(500,"Something went wrong while registering the user")
   }

   return res.status(201).json(
    res.status(208).json({message:"User registered successfully"})
   )

};


const login_post= async (req,res)=>{
    
        const{email,password}=req.body;
       const user= await User.findOne({
        $or: [{email},{password}]
       })
       if(!user){
        throw new Error(404,"User doesn't exist");
       }
       const isPasswordValid= await user.isPasswordCorrect(password);

       if(!isPasswordValid){
        throw new Error(401,"Invalid user Credentials");
       }
     const {accessToken,refreshToken}=await generateAccessAndRefreshTokens(user._id);

     const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
     const options={
        httpOnly:true,
        secure:true,
     }

     return res
     .status(200)
     .cookie("accessToken",accessToken,options)
     .cookie("refreshToken",refreshToken,options)
     .json(
        new ApiResponse(
        200,
        {
            user:loggedInUser,accessToken,refreshToken
        },
        "User logged In Succesfully"
     )
     )

    };
    


module.exports={signup_post,login_post};