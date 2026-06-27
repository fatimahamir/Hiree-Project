const express = require("express");

const router = express.Router();

const {
  applyJob,
  getApplications,
  updateStatus,
  deleteNotification,
} = require("../controllers/jobApplicationController");

const { protect } = require("../middleware/authMiddleware"); // ✅ YEH CHANGE KARO

// Freelancer Apply for Job
router.post("/", protect, applyJob);

// Get Applications Dashboard
router.get("/", protect, getApplications);

// Customer Accept / Reject Job Application
router.put("/:id/status", protect, updateStatus);

// Remove Notification
router.delete("/:id", protect, deleteNotification);

module.exports = router;