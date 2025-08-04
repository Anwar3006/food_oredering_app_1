import { eq, sql } from "drizzle-orm";
import logger from "../config/logger.js";
import { db } from "../db/dbClient.js";
import { orderItemTable, orderTable } from "../db/schema.js";

export const OrderRepository = {
  createOrder: async (order, orderItems) => {
    const [createdOrder] = await db
      .insert(orderTable)
      .values(order)
      .returning();
    if (!createdOrder?.id) {
      throw new Error("Failed to create order");
    }

    const orderId = createdOrder.id;

    const createdOrderItems = await Promise.all(
      orderItems.map(async (item) => {
        const [orderItem] = await db
          .insert(orderItemTable)
          .values({
            ...item,
            orderId: orderId,
          })
          .returning();

        if (!orderItem?.id) {
          throw new Error(`Failed to create order item: ${item.itemName}`);
        }

        return orderItem;
      })
    );

    return {
      orderId: orderId,
      order: createdOrder,
      orderItems: createdOrderItems,
    };
  },

  orderCount: async () => {
    const count = await db.$count(orderTable);
    return count;
  },

  updateOrder: async (orderNumber, data) => {
    try {
      // Prepare update data
      const updateData = typeof data === "string" ? { status: data } : data;

      // Perform the update
      const [updatedOrder] = await db
        .update(orderTable)
        .set({ ...updateData, updatedAt: sql`now()` })
        .where(eq(orderTable.orderNumber, orderNumber))
        .returning();

      // Check if order was found and updated
      if (!updatedOrder) {
        throw new Error(`Order with number ${orderNumber} not found`);
      }

      logger.info(`Order: ${orderNumber} updated successfully`);

      return updatedOrder;
    } catch (error) {
      logger.error("Error updating order: " + error.message);
      throw new Error("Failed to update order", { cause: error });
    }
  },
};
