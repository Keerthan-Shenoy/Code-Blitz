import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongoConnect.js";
import authRoutes from "./Routes/authRoutes.js"
import CommunityRoutes from "./Routes/communityRoutes.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB(); // Connect to MongoDB

app.use("/api/auth", authRoutes);
app.use("/api/community", CommunityRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
