import { AppError } from "../errors/AppError.error.js";

import { catchAsync } from "../errors/errorHandler.error.js";
import { CategoryService } from "../services/category.service.js";

export const CategoryController = {
  getAllCategory: catchAsync(async (req, res, next) => {
    const {
      page = 1,
      limit = 8,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;
    const options = {
      page: parseInt(page),
      limit: Math.min(parseInt(limit), 8),
      sortBy,
      sortOrder,
    };

    const result = await CategoryService.getAllCategory(options);
    if (!result.data) {
      return next(new AppError("No data found for categories", 404));
    }
    res.status(200).json({ success: true, ...result });
  }),

  getCategoryById: catchAsync(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
      return next(new AppError("No ID provided", 400));
    }

    const category = await CategoryService.getCategoryById(id);
    res.status(200).json({ success: true, data: category });
  }),
};
