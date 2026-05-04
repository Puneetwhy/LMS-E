import { Router } from "express";
import {
  allPayment,
  buySubscription,
  cancelSubscription,
  getRazorpayApikey,
  verifySubscription
} from "../controllers/payment.controller.js";

import {
  authorizedRoles,
  isLoggedIn
} from "../middlewares/auth.middleware.js";

const router = Router();

// ================= GET RAZORPAY KEY =================
router.get(
  "/razorpay-key",
  isLoggedIn,
  getRazorpayApikey
);

// ================= SUBSCRIBE =================
router.post(
  "/subscribe",
  isLoggedIn,
  buySubscription
);

// ================= VERIFY PAYMENT =================
router.post(
  "/verify",
  isLoggedIn,
  verifySubscription
);

// ================= CANCEL SUBSCRIPTION =================
router.post(
  "/unsubscribe",
  isLoggedIn,
  cancelSubscription
);

// ================= PAYMENT STATS (ADMIN ONLY) =================
router.get(
  "/",
  isLoggedIn,
  authorizedRoles("ADMIN"), // ✅ FIXED
  allPayment
);

export default router;