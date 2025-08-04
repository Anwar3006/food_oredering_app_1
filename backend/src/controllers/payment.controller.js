import Stripe from "stripe";

import {
  STRIPE_PUBLISHABLE_KEY,
  STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET,
} from "../config/env.js";
import logger from "../config/logger.js";
import { AppError } from "../errors/AppError.error.js";
import { catchAsync } from "../errors/errorHandler.error.js";
import { OrderService } from "../services/order.service.js";

export const PaymentController = {
  initStripe: () => new Stripe(STRIPE_SECRET_KEY),

  createPaymentSheet: catchAsync(async (req, res, next) => {
    const { amount, currency, userId, orderNumber } = req.body;

    if (!amount || !userId || !orderNumber) {
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
        orderNumber: orderNumber,
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

  // Webhook endpoint for Stripe events (optional but recommended)
  stripeWebhooks: catchAsync(async (req, res, next) => {
    console.log("Stripe webhook called");
    const sig = req.headers["stripe-signature"];
    const endpointSecret = STRIPE_WEBHOOK_SECRET;

    if (!endpointSecret) {
      return next(new AppError("Webhook secret not configured", 500));
    }

    let event;
    const stripe = PaymentController.initStripe();

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      logger.error(`Webhook signature verification failed: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log(`Received event: ${event.type}`);

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        logger.info(`Payment succeeded for ${paymentIntent.id}`);
        // Update order status in database
        await OrderService.updateOrderStatus(
          paymentIntent.metadata.orderNumber,
          "confirmed"
        );

        break;
      case "payment_intent.payment_failed":
        const failedPayment = event.data.object;
        logger.error(`Payment failed for ${failedPayment.id}`);
        // Handle failed payment

        break;
      default:
        logger.info(`Unhandled event type ${event.type}`);
    }
    res.status(200).json({ received: true });
  }),
};
