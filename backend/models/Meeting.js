import mongoose from "mongoose";

const MeetingSchema = new mongoose.Schema({
    community_id: { type: mongoose.Schema.Types.ObjectId, ref: "Community", required: true },
    host_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    topic: { type: String, required: true },
    meeting_link: { type: String, required: true },
    scheduled_time: { type: Date, required: true },
    created_at: { type: Date, default: Date.now }
});

export default mongoose.model("Meeting", MeetingSchema);
