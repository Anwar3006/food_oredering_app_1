import {
  pgTable,
  uuid,
  text,
  integer,
  decimal,
  timestamp,
  varchar,
  json,
  index,
  serial,
} from "drizzle-orm/pg-core";

import { user } from "./auth-schema.js";
import { address } from "./address.schema.js";
import { menuItemTable } from "./menu_item.schema.js";
import {
  orderStatusEnum,
  paymentMethodEnum,
  paymentStatusEnum,
} from "./enums.schema.js";

// Main order table
export const orderTable = pgTable(
  "order",
  {
    id: uuid().primaryKey().defaultRandom(),
    orderNumber: varchar("order_number", { length: 20 }).notNull().unique(), // e.g., "ORD-2024-001234"
    
    // Customer information
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    
    // Delivery information
    deliveryAddressId: integer("delivery_address_id")
      .notNull()
      .references(() => address.id, { onDelete: "restrict" }),
    
    // Order details
    status: orderStatusEnum("status").notNull().default("pending"),
    subtotal: integer("subtotal").notNull(), // Amount in cents
    deliveryFee: integer("delivery_fee").notNull().default(0),
    taxAmount: integer("tax_amount").notNull().default(0),
    discountAmount: integer("discount_amount").notNull().default(0),
    totalAmount: integer("total_amount").notNull(),
    
    // Special instructions
    specialInstructions: text("special_instructions"),
    
    // Timestamps
    estimatedDeliveryTime: timestamp("estimated_delivery_time"),
    actualDeliveryTime: timestamp("actual_delivery_time"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("order_user_idx").on(table.userId),
    index("order_status_idx").on(table.status),
    index("order_number_idx").on(table.orderNumber),
    index("order_created_at_idx").on(table.createdAt),
  ]
);

// Order items table (junction table with additional data)
export const orderItemTable = pgTable(
  "order_item",
  {
    id: uuid().primaryKey().defaultRandom(),
    
    // References
    orderId: uuid("order_id")
      .notNull()
      .references(() => orderTable.id, { onDelete: "cascade" }),
    menuItemId: uuid("menu_item_id")
      .notNull()
      .references(() => menuItemTable.id, { onDelete: "restrict" }),
    
    // Item details at time of order (for historical accuracy)
    itemName: varchar("item_name", { length: 100 }).notNull(),
    itemPrice: integer("item_price").notNull(), // Price in cents at time of order
    quantity: integer("quantity").notNull().default(1),
    
    // Customizations as JSON (flexible for different types)
    customizations: json("customizations").default([]),
    
    // Item subtotal
    subtotal: integer("subtotal").notNull(), // quantity * (itemPrice + customization costs)
    
    // Special instructions for this specific item
    specialInstructions: text("special_instructions"),
    
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("order_item_order_idx").on(table.orderId),
    index("order_item_menu_item_idx").on(table.menuItemId),
  ]
);

// Payment information table
export const orderPaymentTable = pgTable(
  "order_payment",
  {
    id: uuid().primaryKey().defaultRandom(),
    
    // Order reference
    orderId: uuid("order_id")
      .notNull()
      .references(() => orderTable.id, { onDelete: "cascade" }),
    
    // Payment details
    paymentMethod: paymentMethodEnum("payment_method").notNull(),
    paymentStatus: paymentStatusEnum("payment_status").notNull().default("pending"),
    amount: integer("amount").notNull(), // Amount in cents
    
    // External payment references
    transactionId: varchar("transaction_id", { length: 100 }), // From payment provider
    paymentReference: varchar("payment_reference", { length: 100 }), // Internal reference
    
    // Payment provider response (stored as JSON for flexibility)
    providerResponse: json("provider_response"),
    
    // Timestamps
    processedAt: timestamp("processed_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("order_payment_order_idx").on(table.orderId),
    index("order_payment_status_idx").on(table.paymentStatus),
    index("order_payment_transaction_idx").on(table.transactionId),
  ]
);

// Order status history table (for tracking status changes)
export const orderStatusHistoryTable = pgTable(
  "order_status_history",
  {
    id: uuid().primaryKey().defaultRandom(),
    
    orderId: uuid("order_id")
      .notNull()
      .references(() => orderTable.id, { onDelete: "cascade" }),
    
    fromStatus: orderStatusEnum("from_status"),
    toStatus: orderStatusEnum("to_status").notNull(),
    
    notes: text("notes"), // Optional notes about the status change
    changedBy: text("changed_by"), // User ID or system identifier
    
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("order_status_history_order_idx").on(table.orderId),
    index("order_status_history_created_at_idx").on(table.createdAt),
  ]
);
