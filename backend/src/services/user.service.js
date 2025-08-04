import { UserRepository } from "../repositories/user.respository.js";

export const UserService = {
  getUserById: async (id) => {
    const user = await UserRepository.getUserById(id);
    return user;
  },
};
