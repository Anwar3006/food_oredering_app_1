import { AppError } from "../errors/AppError.error.js";
import { MenuItemRepository } from "../repositories/menuItem.repository.js";

export const MenuItemService = {
  getMenuItemById: async (id) => {
    if (!id) {
      new AppError("Id not provided", 400);
    }
    return await MenuItemRepository.getMenuItemById(id);
  },

  getAllMenuItem: async (option) => {
    const items = await MenuItemRepository.getAllMenuItem(option);
    return items;
  },

  getMenuItemsByCategoryAndTextSearch: async (query, categoryId, options) => {
    const items = await MenuItemRepository.getMenuItemsByCategoryAndTextSearch(
      query,
      categoryId,
      options
    );
    return items;
  },
};
