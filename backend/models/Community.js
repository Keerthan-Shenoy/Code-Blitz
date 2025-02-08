import mongoose from "mongoose";

const CommunitySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    host_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    image_url: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }, 
    price: { type: Number, default: 0},
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export default mongoose.model("Community", CommunitySchema);
