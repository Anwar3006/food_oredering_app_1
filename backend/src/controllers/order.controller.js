import { AppError } from "../errors/AppError.error.js";

import { catchAsync } from "../errors/errorHandler.error.js";
import {
  generateOrderNumber,
  OrderService,
} from "../services/order.service.js";

export const OrderController = {
  createOrder: catchAsync(async (req, res, next) => {
    const {
      userId,
      items,
      totalItems,
      totalPrice,
      deliveryFee,
      discountAmount,
      taxAmount,
    } = req.body;

    if (!userId || !items || !totalItems || !totalPrice || !deliveryFee) {
      return next(new AppError("All fields are required", 400));
    }

    const newOrder = await OrderService.createOrder({
      userId,
      items,
      totalItems,
      totalPrice,
      deliveryFee,
      discountAmount,
      taxAmount,
      specialInstructions: "",
    });
    if (!newOrder) {
      return next(new AppError("Order not created", 400));
    }

    res.status(201).json({
      status: "success",
      data: newOrder,
    });
  }),

  updateOrder: catchAsync(async (req, res, next) => {
    const data = req.body;
    const updatedOrder = await OrderService.updateOrder(data.orderNumber, data);
    if (!updatedOrder) {
      return next(new AppError("Order not updated", 400));
    }
    res.status(200).json({
      status: "success",
      data: updatedOrder,
    });
  }),
};
