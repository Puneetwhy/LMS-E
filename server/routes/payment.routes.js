import { Router } from 'express';
import { allPayment, buySubscription, cancelSubscription, getRazorpayApikey, verifySubscription } from '../controllers/payment.controller.js';
import { authorizedRoles, isLoggedIn } from '../middlewares/auth.middleware.js';

const router = Router();

router
      .route('/razorpay-key')
      .get(
            isLoggedIn,
            getRazorpayApikey
      );

router
      .route('/subscribe')
      .post(
            isLoggedIn,
            buySubscription
      );

router
      .route('/verify')
      .post(
            isLoggedIn,
            verifySubscription
      );

router
      .route('/unsubscribe')
      .post(
            isLoggedIn,
            cancelSubscription
      );

router
      .route('/')
      .get(
            isLoggedIn,
            authorizedRoles,
            allPayment
      );

export default router




