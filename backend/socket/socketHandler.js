// socket/socketHandler.js
const { Server } = require("socket.io");

let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // Apna frontend URL daalein (Vite ka default)
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("✅ User connected:", socket.id);

    // Jab user login kare toh apni ID join kare (user._id ke naam ka room)
    socket.on("join", (userId) => {
      socket.join(userId);
      console.log(`🔵 User ${userId} joined their room`);
    });

    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
    });
  });

  return io;
};

// io instance export karna taake controllers mein use ho sake
const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

module.exports = { initSocket, getIO };