import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { customizationTypeEnum } from "./enums.schema.js";

export const customizationTable = pgTable("customization", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull(),
  price: integer("price").notNull(),
  type: customizationTypeEnum("type").notNull(),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

//Relationships: Defined in ../relations.js
// Many customizations can be added to many menu items so we create a join table to represent this many-to-many relationship between Customization and MenuItem
// Customization (1) -> (*) Menu_Customization
