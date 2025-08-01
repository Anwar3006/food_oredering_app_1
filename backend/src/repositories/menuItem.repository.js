import { and, asc, desc, eq, ilike, or } from "drizzle-orm";

import {
  customizationTable,
  menuCustomizationTable,
  menuItemTable,
} from "../db/schema.js";
import { db } from "../db/dbClient.js";
import { AppError } from "../errors/AppError.error.js";

export const MenuItemRepository = {
  getMenuItemById: async (id) => {
    // Get the menu item first
    const menuItemResult = await db
      .select()
      .from(menuItemTable)
      .where(eq(menuItemTable.id, id))
      .limit(1);

    if (!menuItemResult || menuItemResult.length === 0) {
      return null;
    }

    const menuItem = menuItemResult[0];

    // Get customizations for this menu item
    const customizations = await db
      .select({
        id: customizationTable.id,
        name: customizationTable.name,
        price: customizationTable.price,
        type: customizationTable.type,
        createdAt: customizationTable.createdAt,
        updatedAt: customizationTable.updatedAt,
      })
      .from(customizationTable)
      .innerJoin(
        menuCustomizationTable,
        eq(customizationTable.id, menuCustomizationTable.customization_id)
      )
      .where(eq(menuCustomizationTable.menu_item_id, id));

    return {
      ...menuItem,
      customizations,
    };
  },

  getAllMenuItem: async ({
    page = 1,
    limit = 8,
    sortBy = "createdAt",
    sortOrder = "desc",
  }) => {
    const offset = (page - 1) * limit;
    const sorting = sortOrder === "desc" ? desc : asc;

    // Validate sortBy field exists in table
    if (!menuItemTable[sortBy]) {
      throw new AppError(`Invalid sort field: ${sortBy}`, 400);
    }

    // Validate pagination parameters
    if (page < 1 || limit < 1 || limit > 100) {
      throw new AppError("Invalid pagination parameters", 400);
    }

    const [paginatedItem, totalItems] = await Promise.all([
      db
        .select()
        .from(menuItemTable)
        .limit(limit)
        .offset(offset)
        .orderBy(sorting(menuItemTable[sortBy])),

      db.$count(menuItemTable),
    ]);

    const totalPages = Math.ceil(totalItems / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return {
      data: paginatedItem,
      meta: {
        currentPage: page,
        totalPages,
        totalItems,
        perPage: limit,
        hasNextPage,
        hasPrevPage,
      },
    };
  },
};
