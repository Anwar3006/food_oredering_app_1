import { relations } from "drizzle-orm";

import { categoryTable } from "./schema/category.schema.js";
import { menuItemTable } from "./schema/menu_item.schema.js";
import { customizationTable } from "./schema/customization.schema.js";
import { menuCustomizationTable } from "./schema/menu_customization.schema.js";
import { address } from "./schema/address.schema.js";
import { user } from "./schema/auth-schema.js";
import {
  orderTable,
  orderItemTable,
  orderPaymentTable,
  orderStatusHistoryTable,
} from "./schema/order.schema.js";

//////////////// Category and MenuItem Relationship
export const categoryToMenuItemRelation = relations(
  categoryTable,
  ({ many }) => ({
    menuItems: many(menuItemTable),
  })
);

/////////////////// Customization - Menu_Customization - MenuItem Relationship
export const customizationRelations = relations(
  menuCustomizationTable,
  ({ many }) => ({
    customizationToMenuItem: many(menuCustomizationTable),
  })
);
export const customizationToMenuItemRelations = relations(
  menuCustomizationTable,
  ({ one }) => ({
    customization: one(customizationTable, {
      fields: [menuCustomizationTable.customization_id],
      references: [customizationTable.id],
    }),

    menuItem: one(menuItemTable, {
      fields: [menuCustomizationTable.menu_item_id],
      references: [menuItemTable.id],
    }),
  })
);

///////////////// MenuItem Relationships to Customization and Category
export const menuItemRelations = relations(menuItemTable, ({ many, one }) => ({
  customizationToMenuItem: many(menuCustomizationTable),
  category: one(categoryTable, {
    fields: [categoryTable.name],
    references: [menuItemTable.category],
  }),
}));

///////////////////// User - Address Relation
// Address belongs to one User
export const addressRelations = relations(address, ({ one }) => ({
  user: one(user, {
    fields: [address.userId],
    references: [user.id],
  }),
}));
// User has many Address and Orders
export const userRelations = relations(user, ({ many }) => ({
  addresses: many(address),
  orders: many(orderTable),
}));

///////////////////// Order Relations
// Order belongs to User and Address, has many OrderItems, Payments, and StatusHistory
export const orderRelations = relations(orderTable, ({ one, many }) => ({
  user: one(user, {
    fields: [orderTable.userId],
    references: [user.id],
  }),
  deliveryAddress: one(address, {
    fields: [orderTable.deliveryAddressId],
    references: [address.id],
  }),
  orderItems: many(orderItemTable),
  payments: many(orderPaymentTable),
  statusHistory: many(orderStatusHistoryTable),
}));

// OrderItem belongs to Order and MenuItem
export const orderItemRelations = relations(orderItemTable, ({ one }) => ({
  order: one(orderTable, {
    fields: [orderItemTable.orderId],
    references: [orderTable.id],
  }),
  menuItem: one(menuItemTable, {
    fields: [orderItemTable.menuItemId],
    references: [menuItemTable.id],
  }),
}));

// OrderPayment belongs to Order
export const orderPaymentRelations = relations(orderPaymentTable, ({ one }) => ({
  order: one(orderTable, {
    fields: [orderPaymentTable.orderId],
    references: [orderTable.id],
  }),
}));

// OrderStatusHistory belongs to Order
export const orderStatusHistoryRelations = relations(
  orderStatusHistoryTable,
  ({ one }) => ({
    order: one(orderTable, {
      fields: [orderStatusHistoryTable.orderId],
      references: [orderTable.id],
    }),
  })
);

// Update MenuItem to include OrderItems relationship
export const menuItemToOrderItemRelations = relations(
  menuItemTable,
  ({ many, one }) => ({
    customizationToMenuItem: many(menuCustomizationTable),
    orderItems: many(orderItemTable),
    category: one(categoryTable, {
      fields: [categoryTable.name],
      references: [menuItemTable.category],
    }),
  })
);

// Update Address to include Orders relationship
export const addressToOrderRelations = relations(address, ({ one, many }) => ({
  user: one(user, {
    fields: [address.userId],
    references: [user.id],
  }),
  orders: many(orderTable),
}));
