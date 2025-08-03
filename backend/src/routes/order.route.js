import Router from "express";

import { OrderController } from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.post("/", OrderController.createOrder);
// orderRouter.get("/", OrderController.getAllOrder);
// orderRouter.get("/:id", OrderController.getOrderById);

// Only Admin can update and delete order
// orderRouter.put("/:id", OrderController.updateOrder);
// orderRouter.delete("/:id", OrderController.deleteOrder);

export default orderRouter;
