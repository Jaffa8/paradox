const User=require("../models/user.model.js");

const jwt=require("jsonwebtoken");

const bcrypt=require("bcrypt");


    

const signup_post = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!password) {
            throw new Error("Password is required");
        }
        if (password.length < 6) {
            throw new Error("Password must be at least 6 characters long");
        }

       
       
        const existedUser = await User.findOne({ email });

        if (existedUser) {
            throw new Error(409, "User with same email already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword });

        if (!user) {
            throw new Error(500, "Something went wrong while registering the user");
        }

        // Generate JWT token for the newly created user
        const token = jwt.sign({ userId: user._id }, "process.env.JWT_SECRET", { expiresIn: "1h" });
        console.log("JWT Token:", token);
        return res.status(201).json({ message: "User registered successfully", token });
       
    } catch (error) {
        console.error("Error in signup_post:", error);
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
};


const login_post = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            const error = new Error("User doesn't exist");
            error.status = 404;
            throw error;
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            const error = new Error("Invalid user credentials");
            error.status = 401;
            throw error;
        }

        // Generate JWT token for the logged-in user
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" }); // Replace 'your_secret_key_here' with your actual secret key
        console.log("JWT Token:", token);

        // Successful login with JWT token included in the response
        return res.status(200).json({ message: "User logged in successfully", user, token });
    } catch (error) {
        console.error("Error in login_post:", error);
        return res.status(error.status || 500).json({ message: error.message });
    }
};




module.exports={signup_post,login_post};