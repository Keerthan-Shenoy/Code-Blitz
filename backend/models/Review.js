const mongoose = require("mongoose");


const ReviewSchema = new mongoose.Schema({
    community_id: { type: mongoose.Schema.Types.ObjectId, ref: "Community", required: true },
    reviewer_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

export default mongoose.model("Review", ReviewSchema);
