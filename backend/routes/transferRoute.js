const express = require('express');
const { transferToken } = require('../controllers/transferController');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();
router.post('/', authenticateToken, transferToken);

module.exports = router;
