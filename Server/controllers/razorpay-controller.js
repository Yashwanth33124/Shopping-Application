const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');
const User = require('../models/User');

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID?.trim(),
  key_secret: process.env.RAZORPAY_KEY_SECRET?.trim(),
});

// Create Order
const createOrder = async (req, res) => {
  try {
    const { amount, isSubscription, subscriptionPlan, products } = req.body;
    const userId = req.userInfo.userId;

    console.log("Creating Razorpay Order - Amount:", amount, "User:", userId);

    if (!amount || isNaN(amount)) {
        return res.status(400).json({ success: false, message: "Invalid amount provided" });
    }

    const options = {
      amount: Math.round(Number(amount) * 100), // amount in smallest currency unit (paise)
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    const razorpayOrder = await razorpayInstance.orders.create(options);
    console.log("Razorpay Order Created Successfully:", razorpayOrder.id);

    const newOrder = new Order({
      user: userId,
      amount: Number(amount),
      razorpayOrderId: razorpayOrder.id,
      trackingId: `VC-TRK-${Date.now()}`,
      isSubscription: isSubscription || false,
      subscriptionPlan: subscriptionPlan || null,
      products: products || [],
      status: 'pending'
    });

    await newOrder.save();

    res.status(200).json({
      success: true,
      order: razorpayOrder,
    });
  } catch (error) {
    console.error("Razorpay Order Creation Error Full Details:", error);
    res.status(500).json({ 
        success: false, 
        message: "Order creation failed",
        error: error.message || "Unknown error"
    });
  }
};

// Verify Payment
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isMatch = expectedSignature === razorpay_signature;

    if (isMatch) {
      const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });
      if (order) {
        order.razorpayPaymentId = razorpay_payment_id;
        order.status = 'completed';
        await order.save();

        if (order.isSubscription) {
          await User.findByIdAndUpdate(order.user, {
            isPrime: true,
            primePlan: order.subscriptionPlan
          });
        }
      }

      res.status(200).json({
        success: true,
        message: "Payment verified successfully",
      });
    } else {
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    console.error("Razorpay Verification Error:", error);
    res.status(500).json({ success: false, message: "Payment verification failed" });
  }
};

module.exports = { createOrder, verifyPayment };
