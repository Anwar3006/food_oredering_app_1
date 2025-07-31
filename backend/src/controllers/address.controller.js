import { AppError } from "../errors/AppError.error.js";
import { catchAsync } from "../errors/errorHandler.error.js";
import { AddressService } from "../services/address.service.js";

export const AddressController = {
  addAddress: catchAsync(async (req, res, next) => {
    const { phoneNumber, addressLine, city, region, type, userId } = req.body;

    if (!phoneNumber || !addressLine || !city || !region || !type || !userId) {
      return next(new AppError("All fields are required", 400));
    }

    const newAddress = await AddressService.addAddress({
      phoneNumber,
      addressLine,
      city,
      region,
      type,
      userId,
    });
    if (!newAddress) {
      return next(new AppError("Address not created", 400));
    }

    res.status(201).json({
      status: "success",
      data: newAddress,
    });
  }),

  getAllAddressForUser: catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const addresses = await AddressService.getAllAddressForUser(userId);
    if (!addresses) {
      return next(new AppError("No address found", 404));
    }
    res.status(200).json({
      status: "success",
      data: addresses,
    });
  }),

  updateAddress: catchAsync(async (req, res, next) => {
    const { id: addressId } = req.params;
    const { phoneNumber, addressLine, city, region, addressType } = req.body;

    if (!phoneNumber || !addressLine || !city || !region || !addressType) {
      return next(new AppError(`All fields are required`, 400));
    }

    const updatedAddress = await AddressService.updateAddress(addressId, {
      phoneNumber,
      addressLine,
      city,
      region,
      addressType,
    });
    if (!updatedAddress) {
      return next(new AppError("Address not updated", 400));
    }

    res.status(200).json({
      status: "success",
      data: updatedAddress,
    });
  }),

  deleteAddress: catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const deletedAddress = await AddressService.deleteAddress(id);
    if (!deletedAddress) {
      return next(new AppError("Address not deleted", 400));
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  }),
};
