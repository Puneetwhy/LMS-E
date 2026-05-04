import User from "../models/user.model.js";
import appError from "../utils/error.util.js";
import { razorpay } from "../server.js";
import Payment from "../models/payment.model.js";
import crypto from "crypto";

// ================= GET RAZORPAY KEY =================
const getRazorpayApikey = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      key: process.env.RAZORPAY_KEY_ID || "",
    });
  } catch (e) {
    return next(new appError(e.message, 500));
  }
};

// ================= BUY SUBSCRIPTION =================
const buySubscription = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) return next(new appError("Unauthorized", 401));

    if (user.role === "ADMIN") {
      return next(new appError("Admin cannot purchase subscription", 400));
    }

    // Prevent duplicate subscription
    if (user.subscription?.status === "active") {
      return next(new appError("Subscription already active", 400));
    }

    const subscription = await razorpay.subscriptions.create({
      plan_id: process.env.RAZORPAY_PLAN_ID,
      customer_notify: 1,
      total_count: 12,
    });

    user.subscription = {
      id: subscription.id,
      status: subscription.status,
    };

    await user.save();

    res.status(200).json({
      success: true,
      subscription_id: subscription.id,
    });
  } catch (e) {
    return next(new appError(e.message, 500));
  }
};

// ================= VERIFY PAYMENT =================
const verifySubscription = async (req, res, next) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_signature,
      razorpay_subscription_id,
    } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return next(new appError("Unauthorized", 401));

    if (!razorpay_payment_id || !razorpay_signature) {
      return next(new appError("Invalid payment data", 400));
    }

    // Signature verification
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpay_payment_id}|${razorpay_subscription_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return next(new appError("Payment verification failed", 400));
    }

    // Save payment
    await Payment.create({
      user: user._id,
      razorpay_payment_id,
      razorpay_signature,
      razorpay_subscription_id,
    });

    // Activate subscription
    user.subscription.status = "active";
    await user.save();

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (e) {
    return next(new appError(e.message, 500));
  }
};

// ================= CANCEL SUBSCRIPTION =================
const cancelSubscription = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) return next(new appError("Unauthorized", 401));

    if (!user.subscription?.id) {
      return next(new appError("No active subscription found", 400));
    }

    const subscription = await razorpay.subscriptions.cancel(
      user.subscription.id
    );

    user.subscription.status = subscription.status;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Subscription cancelled successfully",
    });
  } catch (e) {
    return next(new appError(e.message, 500));
  }
};

// ================= GET ALL PAYMENTS (ADMIN) =================
const allPayment = async (req, res, next) => {
  try {
    const subscriptions = await razorpay.subscriptions.all({
      count: req.query.count || 100,
    });

    const items = subscriptions?.items || [];

    const monthly = new Array(12).fill(0);

    items.forEach((item) => {
      const month = new Date(item.created_at * 1000).getMonth();
      monthly[month]++;
    });

    res.status(200).json({
      success: true,
      allPayments: { count: items.length },
      monthlySalesRecord: monthly,
      finalMonths: {
        Jan: monthly[0],
        Feb: monthly[1],
        Mar: monthly[2],
        Apr: monthly[3],
        May: monthly[4],
        Jun: monthly[5],
        Jul: monthly[6],
        Aug: monthly[7],
        Sep: monthly[8],
        Oct: monthly[9],
        Nov: monthly[10],
        Dec: monthly[11],
      },
    });
  } catch (e) {
    return next(new appError(e.message, 500));
  }
};

export {
  getRazorpayApikey,
  buySubscription,
  verifySubscription,
  cancelSubscription,
  allPayment,
};