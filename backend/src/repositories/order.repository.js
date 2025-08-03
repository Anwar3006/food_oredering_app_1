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
};
