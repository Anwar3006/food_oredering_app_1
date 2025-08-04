import Router from "express";
import { PaymentController } from "../controllers/payment.controller";

const paymentRouter = Router();

paymentRouter.post("/payment-sheet", PaymentController.createPaymentSheet);

export default paymentRouter;
