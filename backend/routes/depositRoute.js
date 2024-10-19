const express = require('express');
const { fundWalletWithTestnetTokens } = require('../controllers/depositeController');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();
router.post('/', authenticateToken, fundWalletWithTestnetTokens);

module.exports = router;
