import { and, asc, desc, eq, ilike, or } from "drizzle-orm";

import { db } from "../db/dbClient.js";
import { categoryTable } from "../db/schema/category.schema.js";
import { AppError } from "../errors/AppError.error.js";
import { menuItemTable } from "../db/schema.js";

export const CategoryRepository = {
  getAllCategory: async (options) => {
    const {
      page = 1,
      limit = 8,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = options;

    if (page < 1 || limit < 1 || limit > 100) {
      throw new AppError("Invalid pagination parameters", 400);
    }
    const offset = (page - 1) * limit;
    const sorting = sortOrder === "desc" ? desc : asc;

    const [paginatedCategories, totalItem] = await Promise.all([
      db
        .select()
        .from(categoryTable)
        .limit(limit)
        .offset(offset)
        .orderBy(sorting(categoryTable[sortBy])),

      db.$count(categoryTable),
    ]);

    const totalPages = Math.ceil(totalItem / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return {
      data: paginatedCategories,
      meta: {
        currentPage: page,
        totalPages,
        perPage: limit,
        totalItem,
        hasNextPage,
        hasPrevPage,
      },
    };
  },

  getCategoryById: async (id) => {
    if (!id) throw new AppError("Id not provided", 400);

    const category = await db
      .select()
      .from(categoryTable)
      .where(eq(categoryTable.id, id));

    if (!category) throw new AppError(`Category with id: ${id} not found`, 404);

    return category;
  },

  getMenuItemsByCategoryOrTextSearch: async (query, category, options) => {
    const { page, limit, sortBy, sortOrder } = options;
    const offset = (page - 1) * limit;
    const sorting = sortOrder === "desc" ? desc : asc;

    let whereClause;

    // Scenario 1: No query, no category OR category is "all" -> fetch all items
    if (!query && (!category || category === "all")) {
      whereClause = undefined; // No filtering
    }
    // Scenario 2: No query, specific category -> filter by category only
    else if (!query && category && category !== "all") {
      whereClause = eq(menuItemTable.category, category);
    }
    // Scenario 3: Query exists, no category OR category is "all" -> search by text only
    else if (query && (!category || category === "all")) {
      const searchTerm = `%${query}%`;
      whereClause = or(
        ilike(menuItemTable.name, searchTerm),
        ilike(menuItemTable.description, searchTerm)
      );
    }
    // Scenario 4: Query exists, specific category -> search by text AND filter by category
    else if (query && category && category !== "all") {
      const searchTerm = `%${query}%`;
      whereClause = and(
        or(
          ilike(menuItemTable.name, searchTerm),
          ilike(menuItemTable.description, searchTerm)
        ),
        eq(menuItemTable.category, category)
      );
    }

    const [basicSearchItems, totalItems] = await Promise.all([
      db
        .select()
        .from(menuItemTable)
        .where(whereClause)
        .limit(limit)
        .offset(offset)
        .orderBy(sorting(menuItemTable[sortBy])),

      db.$count(menuItemTable, whereClause),
    ]);

    const totalPages = Math.ceil(totalItems / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return {
      data: basicSearchItems,
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
