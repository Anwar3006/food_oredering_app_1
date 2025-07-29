import { Router } from "express";
import { CategoryController } from "../controllers/category.controller.js";

const categoryRouter = Router();

categoryRouter.get("/", CategoryController.getAllCategory);
categoryRouter.get(
  "/menu-items",
  CategoryController.getMenuItemsByCategoryOrTextSearch
);
categoryRouter.get("/:id", CategoryController.getCategoryById);

export default categoryRouter;
