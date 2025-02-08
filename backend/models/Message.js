import mongoose from "mongoose";


const MessageSchema = new mongoose.Schema({
    community_id: { type: mongoose.Schema.Types.ObjectId, ref: "Community", required: true },
    sender_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String },
    file_url: { type: String, default: null },
    created_at: { type: Date, default: Date.now }
});

export default mongoose.model("Message", MessageSchema);
