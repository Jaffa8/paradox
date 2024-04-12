const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

let signupToken = ''; // Store the signup token globally

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
            throw new Error("User with the same email already exists");
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword });

        if (!user) {
            throw new Error("Something went wrong while registering the user");
        }

        // Generate JWT token for the newly created user
        signupToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "48h" });
        console.log("JWT Token (Signup):", signupToken);

        // Return the token along with the message
        return res.status(201).json({ message: "User registered successfully", token: signupToken });
    } catch (error) {
        console.error("Error in signup_post:", error);
        return res.status(error.status || 500).json({ message: error.message });
    }
};

const login_post = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("User doesn't exist");
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            throw new Error("Invalid user credentials");
        }

        // Reusing the token generated during signup
        console.log("JWT Token (Login):", signupToken);

        // Successful login with the token generated during signup
        return res.status(200).json({ message: "User logged in successfully", token: signupToken });
    } catch (error) {
        console.error("Error in login_post:", error);
        return res.status(error.status || 500).json({ message: error.message });
    }
};

module.exports = { signup_post, login_post };
