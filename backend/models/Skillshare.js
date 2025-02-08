import mongoose from "mongoose";

const SkillshareSchema = new mongoose.Schema({
    requester_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    to_user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" }
});

export default mongoose.model("Skillshare", SkillshareSchema);
