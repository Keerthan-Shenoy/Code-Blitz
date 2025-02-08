import express from "express";
import mongoose from "mongoose";
import Skillshare from "../models/Skillshare.js";
import Community from "../models/Community.js";

const router = express.Router();

// Endpoint to add a new skill share request (default status: "pending")
router.post("/addSkillshare", async (req, res) => {
    try {
        const { req_com_id, to_com_id } = req.body;
        console.log(`Adding new skill share request from community ${req_com_id} to ${to_com_id}`);

        // Prevent self-request
        if (req_com_id === to_com_id) {
            return res.status(400).json({ error: "You cannot request skill share from the same community." });
        }

        // Check if a request already exists between these communities
        const existingRequest = await Skillshare.findOne({ req_com_id, to_com_id, status: "pending" });
        if (existingRequest) {
            return res.status(400).json({ error: "A pending request already exists." });
        }

        // Create and save the new skill share request
        const newRequest = new Skillshare({ req_com_id, to_com_id });
        await newRequest.save();

        res.status(201).json({ message: "Skill share request sent successfully", request: newRequest });
    } catch (err) {
        console.error("❌ Error adding skill share request:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Endpoint to update skill share request status
router.post("/updateSkillshare", async (req, res) => {
    try {
        const { req_com_id, to_com_id, status } = req.body;
        console.log(`Updating request from community ${req_com_id} to ${to_com_id} with status: ${status}`);

        if (!["accepted", "rejected"].includes(status)) {
            return res.status(400).json({ error: "Invalid status. Must be 'accepted' or 'rejected'." });
        }

        // Find the request using req_com_id and to_com_id
        const request = await Skillshare.findOneAndUpdate(
            { req_com_id, to_com_id, status: "pending" }, // Only update if it's still pending
            { status },
            { new: true }
        );

        if (!request) {
            return res.status(404).json({ error: "Pending request not found between these communities" });
        }

        res.status(200).json({ message: "Request status updated successfully", request });
    } catch (err) {
        console.error("❌ Error updating request status:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/requestsToUser/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log(`Fetching pending skill share requests for communities hosted by user: ${userId}`);

        // Find all communities hosted by the user
        const userCommunities = await Community.find({ host_id: userId }).select("_id");
        const communityIds = userCommunities.map(com => com._id);

        // Fetch pending requests for those communities
        const requests = await Skillshare.find({ to_com_id: { $in: communityIds }, status: "pending" })
            .populate({
                path: "req_com_id",
                select: "title host_id",
                populate: { path: "host_id", select: "first_name email" },
            })
            .populate({
                path: "to_com_id",
                select: "title host_id",
                populate: { path: "host_id", select: "first_name email" },
            });

        res.status(200).json({ message: "Pending requests fetched successfully", requests });
    } catch (err) {
        console.error("❌ Error fetching requests:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


export default router;
