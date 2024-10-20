const express = require('express');
const router = express.Router();
const { getBalance } = require('../controllers/balanceController');
const { authenticateToken } = require('../middlewares/authMiddleware');


router.get('/', authenticateToken, getBalance);

module.exports = router;
