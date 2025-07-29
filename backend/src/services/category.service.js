import { CategoryRepository } from "../repositories/category.repository.js";

export const CategoryService = {
  getAllCategory: async (options) => {
    const result = await CategoryRepository.getAllCategory(options);
    return result;
  },

  getCategoryById: async (id) => {
    console.log("ID: ", id);
    const result = await CategoryRepository.getCategoryById(id);
    return result;
  },

  getMenuItemsByCategoryAndTextSearch: async (query, category, options) => {
    const items = await CategoryRepository.getMenuItemsByCategoryAndTextSearch(
      query,
      category,
      options
    );
    return items;
  },
};
