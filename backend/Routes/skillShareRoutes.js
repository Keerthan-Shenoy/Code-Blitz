import express from "express";
import mongoose from "mongoose";
import Skillshare from "../models/Skillshare.js";

const router = express.Router();

// Endpoint to add a new skill share request (default status: "pending")
router.post("/addSkillshare", async (req, res) => {
    try {
        const { requester_id, to_user } = req.body;
        console.log(`Adding new skill share request from ${requester_id} to ${to_user}`);

        // Prevent self-request
        if (requester_id === to_user) {
            return res.status(400).json({ error: "You cannot request skill share from yourself." });
        }

        // Check if a request already exists between these users
        const existingRequest = await Skillshare.findOne({ requester_id, to_user, status: "pending" });
        if (existingRequest) {
            return res.status(400).json({ error: "A pending request already exists." });
        }

        // Create and save the new skill share request
        const newRequest = new Skillshare({ requester_id, to_user });
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
        const { requester_id, to_user, status } = req.body;
        console.log(`Updating request from ${requester_id} to ${to_user} with status: ${status}`);

        if (!["accepted", "rejected"].includes(status)) {
            return res.status(400).json({ error: "Invalid status. Must be 'accepted' or 'rejected'." });
        }

        // Find the request using requester_id and to_user
        const request = await Skillshare.findOneAndUpdate(
            { requester_id, to_user, status: "pending" }, // Only update if it's still pending
            { status },
            { new: true }
        );

        if (!request) {
            return res.status(404).json({ error: "Pending request not found between these users" });
        }

        res.status(200).json({ message: "Request status updated successfully", request });
    } catch (err) {
        console.error("❌ Error updating request status:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// Endpoint to get all requests made TO a user
router.get("/requestsToUser/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log(`Fetching pending skill share requests made to user: ${userId}`);

        const requests = await Skillshare.find({ to_user: userId, status: "pending" })
            .populate("requester_id", "first_name last_name email profile_url")
            .populate("to_user", "first_name last_name email profile_url");

        res.status(200).json({ message: "Pending requests fetched successfully", requests });
    } catch (err) {
        console.error("❌ Error fetching requests:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


export default router;
