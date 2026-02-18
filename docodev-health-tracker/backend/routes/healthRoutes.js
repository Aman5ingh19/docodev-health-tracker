const express = require('express');
const router = express.Router();
const {
  addHealthRecord,
  getAllRecords,
  getRecord,
  updateRecord,
  deleteRecord,
  getStats
} = require('../controllers/healthController');
const { protect } = require('../middleware/authMiddleware');

router.post('/add', protect, addHealthRecord);
router.get('/all', protect, getAllRecords);
router.get('/stats', protect, getStats);
router.get('/:id', protect, getRecord);
router.put('/:id', protect, updateRecord);
router.delete('/:id', protect, deleteRecord);

module.exports = router;
