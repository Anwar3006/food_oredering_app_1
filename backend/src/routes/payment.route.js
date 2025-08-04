import Router from "express";
import { PaymentController } from "../controllers/payment.controller.js";

const paymentRouter = Router();

paymentRouter.post("/payment-sheet", PaymentController.createPaymentSheet);
paymentRouter.post("/webhooks", PaymentController.stripeWebhooks);

export default paymentRouter;
