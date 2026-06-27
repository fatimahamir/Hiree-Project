const express = require("express");
const router = express.Router();

const {
  updateProjectStatus,
  getProjects,
} = require("../controllers/projectController");

const { protect } = require("../middleware/authMiddleware");

router.put("/:id", protect, updateProjectStatus);
router.get("/", protect, getProjects);

module.exports = router;