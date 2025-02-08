import express from "express";
import Message from "../models/Message.js";
import upload from "../utils/upload.js"; 
import uploadToGitHub from "../utils/toGithub.js";

const router = express.Router();

// Endpoint to send a message
router.post("/putMessage", upload.single("file"), async (req, res) => {
    try {
        console.log("Calling putMessage");
        console.log("Request Body:", req.body);

        const { community_id, sender_id, text } = req.body;
        let file_url = null;

        // Validate: Either text must be present or a file must be uploaded
        if (!text && !req.file) {
            return res.status(400).json({ error: "Either text or a file is required" });
        }

        // If file is uploaded, upload it to GitHub
        if (req.file) {
            console.log("Uploading file to GitHub:", req.file.originalname);
            const fileName = `message_${Date.now()}_${req.file.originalname}`;
            file_url = await uploadToGitHub(req.file.buffer, fileName);
        }

        // Create a new message entry
        const newMessage = new Message({
            community_id,
            sender_id,
            text: text || null, // Allow text to be null if file is present
            file_url
        });

        await newMessage.save();
        res.status(201).json({ message: "Message sent successfully", newMessage });
    } catch (err) {
        console.error("❌ Error sending message:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.get("/getComMsg/:id", async (req, res) => {
    try {
        const communityId = req.params.id;
        console.log(`Fetching messages for community ID: ${communityId}`);

        // Fetch messages and populate sender details
        const messages = await Message.find({ community_id: communityId })
            .populate("sender_id", "_id first_name email profile_url")
            .sort({ created_at: 1 });

        res.status(200).json({ message: "Messages fetched successfully", messages });
    } catch (err) {
        console.error("❌ Error fetching messages:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
