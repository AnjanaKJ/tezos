const express = require('express');
const { fundWalletWithTestnetTokens } = require('../controllers/depositeController');

const router = express.Router();
router.post('/', fundWalletWithTestnetTokens);

module.exports = router;
