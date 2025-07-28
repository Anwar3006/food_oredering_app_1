import { Router } from "express";
import { CategoryController } from "../controllers/category.controller.js";

const categoryRouter = Router();

categoryRouter.get("/", CategoryController.getAllCategory);
categoryRouter.get("/:id", CategoryController.getCategoryById);

export default categoryRouter;
