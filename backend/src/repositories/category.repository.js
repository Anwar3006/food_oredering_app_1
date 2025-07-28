import { asc, desc, eq } from "drizzle-orm";

import { db } from "../db/dbClient.js";
import { categoryTable } from "../db/schema/category.schema.js";
import { AppError } from "../errors/AppError.error.js";

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
};
