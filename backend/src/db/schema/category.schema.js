import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const categoryTable = pgTable("category", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).unique().notNull(),
  description: varchar("description", { length: 200 }).notNull(),
  image_url: text("image"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

//Relationship: Defined in ../relations.js
// Category (1) -> (*) MenuItem
