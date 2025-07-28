import { AppError } from "../errors/AppError.error.js";
import { catchAsync } from "../errors/errorHandler.error.js";
import { MenuItemService } from "../services/menuItem.service.js";

export const MenuItemController = {
  getMenuItemById: catchAsync(async (req, res, next) => {
    const { id } = req.params;

    if (!id) return next(new AppError("Id not provided", 400));

    const item = await MenuItemService.getMenuItemById(id);

    return res.status(200).json({ success: true, data: item });
  }),

  getAllMenuItem: catchAsync(async (req, res, next) => {
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

    const items = await MenuItemService.getAllMenuItem(options);
    if (!items) return next(new AppError("No items found", 404));

    res.status(200).json({ success: true, ...items });
  }),
};
