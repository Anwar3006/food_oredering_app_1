import { Router } from "express";

import { MenuItemController } from "../controllers/menuItem.controller.js";

const menuItemRouter = Router();

menuItemRouter.get("/", MenuItemController.getAllMenuItem);
menuItemRouter.get("/:id", MenuItemController.getMenuItemById);

export default menuItemRouter;
