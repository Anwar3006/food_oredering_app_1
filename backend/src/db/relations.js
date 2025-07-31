import { relations } from "drizzle-orm";

import { categoryTable } from "./schema/category.schema.js";
import { menuItemTable } from "./schema/menu_item.schema.js";
import { customizationTable } from "./schema/customization.schema.js";
import { menuCustomizationTable } from "./schema/menu_customization.schema.js";
import { address } from "./schema/address.schema.js";
import { user } from "./schema/auth-schema.js";

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
// User has many Address
export const userRelations = relations(user, ({ many }) => ({
  addresses: many(address),
}));
