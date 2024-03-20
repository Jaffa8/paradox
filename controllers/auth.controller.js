const User=require("../models/user.model");

const jwt=require("jsonwebtoken");

const bcrypt=require("bcrypt");

const signup_post=async(req,res)=>{
    try{
        const{email,password}=req.body;
    
    if(!password){
     throw new Error("Password is required");
    } 
    const hashedPassword=await bcrypt.hash(password,10);
    const newUser=new User({email,password:hashedPassword});
    await newUser.save();

    res.status(201).json({message:"User Created"});
    }
    catch(error){
        comsole.error("Error in signup_post:",error);
        res.status(500).json({error:error.message});
    }
};


const login_post= async (req,res)=>{
    try{
        const{email,password}=req.body;
        const user=await User.findOne({email});

        if(!user){
            return res.status(401).json({message:"Auth failed"});
        }

        const isPasswordValid= await bcrypt.compare(password,user.password);

        if(!isPasswordValid){
            return res.status(401).json({message:"Auth failed"});
        }

        const token=jwt.sign({
            userId:isEthereumAddress._id,email:user
        },process.env.JWT_SECRET,{expiresIn:"1h"}
        );
        res.status(200).json({message:"Auth successful",token});
    }
    catch(error){
        console.error("Error in login_post:",error);
        res.status(500).json({error:error.message});

    }
};

module.exports={signup_post,login_post};