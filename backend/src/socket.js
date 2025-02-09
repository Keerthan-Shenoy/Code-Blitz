import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

// Create an instance of Express
const app = express();
app.use(cors());

// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.IO server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Frontend URL
    methods: ["GET", "POST"],
  },
});

// Store messages per room
let messages = {};

// Handle socket connection
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Join a specific room
  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`User with ID: ${socket.id} joined room: ${room}`);
    
    // Send the existing messages for the room to the user
    if (messages[room]) {
      socket.emit("receive_message", { messages: messages[room] });
    }
  });

  // Handle message sending
  socket.on("send_message", (data) => {
    const { community_id, sender_id, text, file_url, created_at } = data;

    // Save messages to the room
    if (!messages[community_id]) {
      messages[community_id] = [];
    }

    const newMessage = {
      senderId: sender_id,
      text: text,
      fileUrl: file_url,
      createdAt: created_at,
    };

    messages[community_id].push(newMessage);

    // Broadcast the message to all users in the room
    io.in(community_id).emit("receive_message", { messages: messages[community_id] });

    console.log(`Message from ${sender_id} in room ${community_id}: ${text}`);
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Start the server
server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
