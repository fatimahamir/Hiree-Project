const express = require('express');
const router = express.Router();
const User = require('../models/User'); // ✅ User model import karein
const {
  getUserProfile,
  updateUserProfile,
  uploadProfilePicture,
  completeAccountSetup,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Existing routes (logged-in user ki apni profile)
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.put('/profile/picture', protect, upload.single('profilePic'), uploadProfilePicture);
router.put('/complete-setup', protect, completeAccountSetup);

// ✅ NEW ROUTE: Kisi bhi user ki public profile dekhne ke liye
router.get('/:id', protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Get User Profile Error:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;