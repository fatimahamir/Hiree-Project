const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const path = require('path');

const connectDB = require("./config/db");
const { initSocket } = require("./socket/socketHandler");

// ========== ROUTES ==========
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const serviceRequestRoutes = require('./routes/serviceRequestRoutes');
const projectRoutes = require("./routes/projectRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const chatRoutes = require("./routes/chatRoutes");
const adminRoutes = require("./routes/adminRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const providerRoutes = require("./routes/providerRoutes");
const postRoutes = require('./routes/postRoutes');
const jobApplicationRoutes = require("./routes/jobApplicationRoutes");

// MIDDLEWARE 
const errorMiddleware = require("./middleware/errorMiddleware");

// ENV & DB 
dotenv.config();
connectDB();

// EXPRESS SETUP 
const app = express();
const server = http.createServer(app);

// SOCKET
initSocket(server);

// ✅ MIDDLEWARES 
app.use(cors({
  origin: [
    'http://localhost:5173',                    
    'http://localhost:3000',                   
    'https://hiree-frontend.vercel.app',      
    
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// TEST ROUTE 
app.get("/", (req, res) => {
  res.send("🚀 Hiree Backend API Running...");
});

// Health check route 
app.get("/api/health", (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Hiree Backend is healthy',
    timestamp: new Date().toISOString()
  });
});

// ========== API ROUTES ==========
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoutes);

// SERVICE REQUEST (Freelancer Service + Customer Request)
app.use("/api/service-requests", serviceRequestRoutes);

app.use("/api/projects", projectRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/providers", providerRoutes);
app.use('/api/posts', postRoutes);

// JOB APPLICATION (Customer Job Post + Freelancer Application)
app.use("/api/job-applications", jobApplicationRoutes);

// ERROR HANDLER
app.use(errorMiddleware);

// SERVER START 
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});