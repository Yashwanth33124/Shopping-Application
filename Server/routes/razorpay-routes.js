const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment } = require('../controllers/razorpay-controller');
const authMiddleware = require('../middleware/auth-middleware');

router.post('/create-order', authMiddleware, createOrder);
router.post('/verify-payment', authMiddleware, verifyPayment);

module.exports = router;
