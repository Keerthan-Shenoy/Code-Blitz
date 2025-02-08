import express from "express";
import mongoose from "mongoose";
import Community from "../models/Community.js";
import Category from "../models/Category.js";
import upload from "../utils/upload.js";
import uploadToGitHub from "../utils/toGithub.js";

const router = express.Router();

// Create a new community
router.post("/create-community", upload.single("image"), async (req, res) => {
    try {
        console.log("Called to community create")
        const { title, description, host_id, category, members } = req.body;

        // Ensure image file is uploaded
        if (!req.file) {
            return res.status(400).json({ error: "Image file is required" });
        }

        // Upload image to GitHub
        const fileName = `${title.replace(/\s+/g, "-").toLowerCase()}-${Date.now()}.jpg`;
        const imageUrl = await uploadToGitHub(req.file.buffer, fileName);

        // Create new community
        const newCommunity = new Community({
            title,
            description,
            host_id,
            image_url: imageUrl,
            category,
            members: members ? JSON.parse(members) : []
        });

        await newCommunity.save();

        res.status(201).json({ message: "Community created successfully", community: newCommunity });
    } catch (err) {
        console.error("❌ Community Creation Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.get("/all-communities", async (req, res) => {
    try {
        console.log("Fetching all communities");

        const communities = await Community.find()
            .populate("host_id", "first_name last_name email") // Populate host details
            .populate("category", "name") // Populate category name
            .populate("members", "first_name last_name email"); // Populate member details

        res.status(200).json({ message: "All communities fetched successfully", communities });
    } catch (err) {
        console.error("❌ Fetching Communities Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.get("/user-communities", async (req, res) => {
    try {
        const { user_id } = req.query;
        console.log(`Fetching communities for user: ${user_id}`);

        // ✅ Convert user_id to ObjectId
        const userObjectId = new mongoose.Types.ObjectId(user_id);

        // Find communities where user is either a host or a member
        const userCommunities = await Community.find({
            $or: [{ host_id: userObjectId }, { members: userObjectId }]
        })
            .populate("host_id", "first_name last_name email")
            .populate("category", "name")
            .populate("members", "first_name last_name email");

        res.status(200).json({ message: "User communities fetched successfully", communities: userCommunities });
    } catch (err) {
        console.error("❌ Fetching User Communities Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


export default router;
