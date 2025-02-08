import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Community from "../models/Community.js";
import upload from "../utils/upload.js"; // Multer for image upload
import uploadToGitHub from "../utils/toGithub.js"; // GitHub image uploader

const router = express.Router();

// User Registration with Profile Image Upload
router.post("/register", upload.single("profile"), async (req, res) => {
    try {
        console.log("Calling Register");
        const { first_name, last_name, country, gender, dob, email, password, about } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already registered" });
        }

        // Ensure profile image is uploaded
        if (!req.file) {
            return res.status(400).json({ error: "Profile image is required" });
        }

        // Upload profile image to GitHub
        const fileName = `${first_name.toLowerCase()}-${Date.now()}.jpg`;
        const profileUrl = await uploadToGitHub(req.file.buffer, fileName);

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            first_name,
            last_name,
            country,
            gender,
            dob,
            email,
            password: hashedPassword,
            about,
            profile_url: profileUrl, // Store GitHub image URL
        });

        // Save to database
        await newUser.save();

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (err) {
        console.error("❌ Registration Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// User Login
router.post("/login", async (req, res) => {
    try {
        console.log("Calling Login");
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Fetch the communities hosted by the user
        const hostedCommunities = await Community.find({ host_id: user._id });

        res.status(200).json({ message: "Login successful", user, hostedCommunities });
    } catch (err) {
        console.error("❌ Login Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
