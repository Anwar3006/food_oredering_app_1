import { catchAsync } from "../errors/errorHandler.error.js";
import { UserService } from "../services/user.service.js";
import { AppError } from "../errors/AppError.error.js";

export const UserController = {
  getUserById: catchAsync(async (req, res, next) => {
    const { id } = req.params;

    if (!id) return next(new AppError("Id not provided", 400));

    const user = await UserService.getUserById(id);

    return res.status(200).json({ success: true, data: user });
  }),
};
