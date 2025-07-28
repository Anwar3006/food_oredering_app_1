import {
  decimal,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { categoryTable } from "./category.schema.js";

export const menuItemTable = pgTable(
  "menu_item",
  {
    id: uuid().primaryKey().defaultRandom(),
    category_id: uuid("category_id").references(() => categoryTable.id, {
      onDelete: "cascade",
    }),
    name: varchar("name", { length: 100 }).notNull(),
    description: varchar("description", { length: 200 }).notNull(),
    rating: decimal("rating", { precision: 2, scale: 1 }).notNull(),
    image_url: text("image").notNull(),
    price: integer("price").notNull(),
    calories: integer("calories").notNull(),
    protein: integer("protein").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    index("name_idx").on(table.name),
    index("description_idx").on(table.description),
  ]
);

//Relationships: Defined in ../relations.js
// Category (1) -> (*) MenuItem
// MenuItem (1) -> (*) Menu_Customization
