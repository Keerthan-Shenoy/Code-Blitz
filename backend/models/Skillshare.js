import mongoose from "mongoose";

const SkillshareSchema = new mongoose.Schema({
    req_com_id: { type: mongoose.Schema.Types.ObjectId, ref: "Community", required: true },
    to_com_id: { type: mongoose.Schema.Types.ObjectId, ref: "Community", required: true },
    status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" }
});

export default mongoose.model("Skillshare", SkillshareSchema);
