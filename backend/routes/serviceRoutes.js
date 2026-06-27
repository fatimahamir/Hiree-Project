const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const {
  createService,
  getServices,
  getServiceById,
  getMyServices,
  deleteService
} = require('../controllers/serviceController');

// ✅ SAHI ORDER (Static routes pehle, Dynamic routes baad mein)
router.get('/', getServices);
router.post('/', protect, createService);
router.get('/me', protect, getMyServices);
router.get('/:id', getServiceById);
router.delete('/:id', protect, deleteService);

module.exports = router;