const express = require('express');
const { createTransaction, getTransactions } = require('../controllers/transactionController');
const router = express.Router();

router.route('/').post(createTransaction).get(getTransactions);

module.exports = router;
