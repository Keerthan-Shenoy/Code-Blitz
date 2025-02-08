import express from "express";
import mongoose from "mongoose";
import Community from "../models/Community.js";
import Category from "../models/Category.js";
import Review from "../models/Review.js";
import upload from "../utils/upload.js";
import uploadToGitHub from "../utils/toGithub.js";

const router = express.Router();

// Create a new community
router.post("/create-community", upload.single("image"), async (req, res) => {
    try {
        console.log("Called to community create")
        const { title, description, host_id, category, price, members } = req.body;

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
            price,
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



router.get("/getComDetail/:id", async (req, res) => {
    try {
        const communityId = req.params.id;
        console.log(`Fetching details for community ID: ${communityId}`);

        const community = await Community.findById(communityId)
            .populate("host_id", "first_name email profile_url") // Populate host details
            .populate("category", "name") // Populate category name
            .populate("members", "first_name email profile_url"); // Populate member details

        if (!community) {
            return res.status(404).json({ error: "Community not found" });
        }

        // Fetch reviews and populate reviewer details
        const reviews = await Review.find({ community_id: communityId })
            .populate("reviewer_id", "first_name last_name email profile_url");

        res.status(200).json({ 
            message: "Community details fetched successfully", 
            community, 
            reviews 
        });
    } catch (err) {
        console.error("❌ Error fetching community details:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



router.post("/joinCom", async (req, res) => {
    try {
        const { community_id, user_id } = req.body;
        console.log(`User ${user_id} joining community ${community_id}`);

        // Convert IDs to ObjectId
        const communityObjectId = new mongoose.Types.ObjectId(community_id);
        const userObjectId = new mongoose.Types.ObjectId(user_id);

        // Find the community
        const community = await Community.findById(communityObjectId);
        if (!community) {
            return res.status(404).json({ error: "Community not found" });
        }

        // Check if user is already a member
        if (community.members.includes(userObjectId)) {
            return res.status(400).json({ error: "User is already a member of this community" });
        }

        // Add user to the members array
        community.members.push(userObjectId);
        await community.save();

        res.status(200).json({ message: "User successfully joined the community", community });
    } catch (err) {
        console.error("❌ Error joining community:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.get("/comBycategory/:categoryId", async (req, res) => {
    try {
        const { categoryId } = req.params;
        console.log(`Fetching communities for category ID: ${categoryId}`);

        const communities = await Community.find({ category: categoryId })
            .populate("host_id", "first_name last_name email") // Include host details
            .populate("category", "name"); // Include category name

        res.status(200).json({ message: "Communities fetched successfully", communities });
    } catch (err) {
        console.error("❌ Error fetching communities by category:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/topComs", async (req, res) => {
    try {
        console.log("Fetching top 6 communities based on rating");

        const topCommunities = await Community.aggregate([
            {
                $lookup: {
                    from: "reviews",
                    localField: "_id",
                    foreignField: "community_id",
                    as: "reviews"
                }
            },
            {
                $addFields: {
                    averageRating: { $avg: "$reviews.rating" }
                }
            },
            {
                $sort: { averageRating: -1 }
            },
            {
                $limit: 6
            },
            {
                $lookup: {
                    from: "users",
                    localField: "host_id",
                    foreignField: "_id",
                    as: "hostDetails"
                }
            },
            {
                $addFields: {
                    host_first_name: { $arrayElemAt: ["$hostDetails.first_name", 0] }
                }
            },
            {
                $project: {
                    reviews: 0, // Exclude reviews
                    hostDetails: 0 // Exclude full host details, keeping only first_name
                }
            }
        ]).exec();

        res.status(200).json({ message: "Top communities fetched successfully", communities: topCommunities });
    } catch (err) {
        console.error("❌ Error fetching top communities:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



router.post("/addReview", async (req, res) => {
    try {
        const { community_id, reviewer_id, rating, comment } = req.body;
        console.log(`Adding review for community: ${community_id} by user: ${reviewer_id}`);

        // Validate rating range
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ error: "Rating must be between 1 and 5" });
        }

        // Check if community exists
        const communityExists = await Community.findById(community_id);
        if (!communityExists) {
            return res.status(404).json({ error: "Community not found" });
        }

        // Create and save the new review
        const newReview = new Review({
            community_id,
            reviewer_id,
            rating,
            comment
        });

        await newReview.save();

        res.status(201).json({ message: "Review added successfully", review: newReview });
    } catch (err) {
        console.error("❌ Error adding review:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



export default router;
