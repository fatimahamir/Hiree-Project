const express = require('express');
const router = express.Router();
const {
  createOrUpdateProviderProfile,
  getProviderProfile,
  getMyProviderProfile,
  addPortfolioItem,
  deletePortfolioItem,
  getAllProviders,
} = require('../controllers/providerController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Public Routes
router.get('/all', getAllProviders);
router.get('/:userId', getProviderProfile);

// Protected Routes (Provider Only)
router.get('/me', protect, getMyProviderProfile);
router.post('/', protect, createOrUpdateProviderProfile);
router.put('/', protect, createOrUpdateProviderProfile);
router.post('/portfolio', protect, upload.single('image'), addPortfolioItem);
router.delete('/portfolio/:itemId', protect, deletePortfolioItem);

module.exports = router;