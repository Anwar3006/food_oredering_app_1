import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

import { user } from "./auth-schema.js";
import { addressTypeEnum, regionEnum } from "./enums.schema.js";

export const address = pgTable("address", {
  id: serial("id").primaryKey(),
  phoneNumber: varchar("phone_number", { length: 25 }).notNull(),
  addressLine: varchar("address_line", { length: 100 }).notNull(), //72 Oxford Street
  city: varchar("city", { length: 100 }),
  region: regionEnum("region").notNull().default("Greater Accra"),
  addressType: addressTypeEnum("type").notNull().default("home"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),

  //FK
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});
