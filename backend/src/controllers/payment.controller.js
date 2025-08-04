import Stripe from "stripe";

import { STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY } from "../config/env.js";
import logger from "../config/logger.js";
import { AppError } from "../errors/AppError.error.js";
import { catchAsync } from "../errors/errorHandler.error.js";

export const PaymentController = {
  initStripe: () => new Stripe(STRIPE_SECRET_KEY),

  createPaymentSheet: catchAsync(async (req, res, next) => {
    const { amount, currency, userId, orderId } = req.body;

    if (!amount || !userId || !orderId) {
      return next(new AppError("All fields are required", 400));
    }
    if (amount && amount <= 0) {
      return next(new AppError("Amount must be greater than 0", 400));
    }

    const stripe = PaymentController.initStripe();

    let customer;
    let ephemeralKey;
    try {
      const existingCustomer = await stripe.customers.list({
        email: `user-${userId}@foodOrdering.app`,
        limit: 1,
      });
      if (existingCustomer.data.length > 0) {
        customer = existingCustomer.data[0];
      } else {
        customer = await stripe.customers.create({
          metadata: {
            userId: userId,
          },
          email: `user-${userId}@foodOrdering.app`,
        });
      }

      ephemeralKey = await stripe.ephemeralKeys.create(
        { customer: customer.id },
        { apiVersion: "2025-07-30.basil" }
      );
    } catch (error) {
      logger.error("Error creating customer or ephemeral key:", error);
      return next(
        new AppError("Error creating customer or ephemeral key:", error)
      );
    }

    const paymentIntentData = {
      amount: amount,
      customer: customer.id,
      currency: currency.toLowerCase(),
      metadata: {
        orderId: orderId,
        userId: userId,
      },
    };

    const paymentIntent = await stripe.paymentIntents.create(paymentIntentData);

    res.status(200).json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey,
      customer: customer.id,
      publishable_key: STRIPE_PUBLISHABLE_KEY,
    });
  }),
};
