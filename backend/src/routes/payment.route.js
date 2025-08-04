import express from "express";
import { PaymentController } from "../controllers/payment.controller.js";

const paymentRouter = express.Router();

paymentRouter.post("/payment-sheet", PaymentController.createPaymentSheet);
paymentRouter.post(
  "/webhooks",
  express.raw({ type: "application/json" }),
  PaymentController.stripeWebhooks
);

export default paymentRouter;
