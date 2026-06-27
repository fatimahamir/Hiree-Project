// backend/routes/postRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Aapka auth middleware
const { getPostById } = require('../controllers/postController');

const {
  createPost,
  getAllPosts,
  getMyPosts,
  deletePost,
} = require('../controllers/postController');

// Public Route (Bina login ke sab dekh sakte hain - Find Work Page)
router.get('/', getAllPosts);

// Protected Routes (Sirf login wale customer ke liye)
router.post('/', protect, createPost);
router.get('/my-posts', protect, getMyPosts);
router.delete('/:id', protect, deletePost);
router.get('/', getAllPosts);
router.get('/:id', getPostById);
module.exports = router;