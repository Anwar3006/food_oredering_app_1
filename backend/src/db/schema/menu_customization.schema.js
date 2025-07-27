import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { menuItemTable } from "./menu_item.schema.js";
import { customizationTable } from "./customization.schema";

export const menuCustomizationTable = pgTable("menu_customization", {
  id: uuid().primaryKey().defaultRandom(),
  customization_id: varchar("customization_id").references(
    () => customizationTable.id,
    { onDelete: "cascade" }
  ),
  menu_item_id: varchar("menu_item_id").references(() => menuItemTable.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

//Relationships: Defined in ../relations.js
// Many customizations can be added to many menu items so we create a join table to represent this many-to-many relationship between Customization and MenuItem
// Customization (1) -> (*) Menu_Customization
// MenuItem (1) -> (*) Menu_Customization
// MenuItem (1) -> (*) Menu_Customization (*) -> Customization
