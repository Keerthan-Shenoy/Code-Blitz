import express from "express";
import mongoose from "mongoose";
import Meeting from "../models/Meeting.js";
import Community from "../models/Community.js";

const router = express.Router();

// Endpoint to create a new session
router.post("/create-session", async (req, res) => {
    try {
        const { community_id, host_id, topic, meeting_link, scheduled_time } = req.body;
        console.log(`Creating session for community ${community_id} by host ${host_id}`);

        const newSession = new Meeting({ community_id, host_id, topic, meeting_link, scheduled_time });
        await newSession.save();

        res.status(201).json({ message: "Session created successfully", session: newSession });
    } catch (err) {
        console.error("❌ Error creating session:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Endpoint to get all sessions with populated info
router.get("/all-sessions", async (req, res) => {
    try {
        console.log("Fetching all sessions");
        const sessions = await Meeting.find()
            .populate("community_id", "title")
            .populate("host_id", "first_name last_name email");

        res.status(200).json({ message: "All sessions fetched successfully", sessions });
    } catch (err) {
        console.error("❌ Error fetching sessions:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Endpoint to get user-related sessions
router.get("/user-session/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log(`Fetching sessions for user: ${userId}`);

        // Find all communities related to the user
        const userCommunities = await Community.find({ $or: [
            { host_id: userId },
            { members: userId }
        ]}).select("_id");
        
        const communityIds = userCommunities.map(com => com._id);

        // Fetch all sessions related to those communities
        const sessions = await Meeting.find({ community_id: { $in: communityIds } })
            .populate("community_id", "title")
            .populate("host_id", "first_name last_name email");

        res.status(200).json({ message: "User-related sessions fetched successfully", sessions });
    } catch (err) {
        console.error("❌ Error fetching user sessions:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
