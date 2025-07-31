import Router from "express";
import { AddressController } from "../controllers/address.controller.js";

const addressRouter = Router();

addressRouter.post("/", AddressController.addAddress);

// GET /api/addresses
addressRouter.get("/:userId", AddressController.getAllAddressForUser);

// PUT /api/addresses/:id
addressRouter.put("/:id", AddressController.updateAddress);

// DELETE /api/addresses/:id
addressRouter.delete("/:id", AddressController.deleteAddress);

export default addressRouter;
