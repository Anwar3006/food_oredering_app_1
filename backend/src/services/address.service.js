import { AddressRepository } from "../repositories/address.repository.js";

export const AddressService = {
  addAddress: async ({
    phoneNumber,
    addressLine,
    city,
    region,
    type,
    userId,
  }) => {
    const newAddress = await AddressRepository.addAddress({
      phoneNumber,
      addressLine,
      city,
      region,
      type,
      userId,
    });

    return newAddress;
  },

  getAllAddressForUser: async (user_id) => {
    const addressForUser = await AddressRepository.getAllAddressForUser(
      user_id
    );
    return addressForUser;
  },

  updateAddress: async (id, data) => {
    const updatedAddress = await AddressRepository.updateAddress(id, data);
    return updatedAddress;
  },

  deleteAddress: async (id) => {
    const deletedAddress = await AddressRepository.deleteAddress(id);
    return deletedAddress;
  },
};
