const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { 
  createRequest, 
  getRequests, 
  updateRequestStatus,
  deleteRequest // ✅ 1. YAHAN IMPORT KAREIN
} = require("../controllers/serviceRequestController");

router.post("/", protect, createRequest);
router.get("/", protect, getRequests);
router.put("/:id/status", protect, updateRequestStatus);

// ✅ 2. YEH NAYA ROUTE ADD KAREIN (Cross button ke liye)
router.delete("/:id", protect, deleteRequest);

module.exports = router;