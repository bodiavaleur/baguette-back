import type { RequestHandler } from "express";
import UserModel from "~models/User";
import ResponseService from "~utils/ResponseService";
import { HttpStatus } from "~config/errors";

const registerController: RequestHandler = async (req, res, next) => {
  try {
    const userData = { ...req.body, dictionary: [] };

    const existedUser = await UserModel.findOne({
      $or: [{ email: userData.email }, { username: userData.username }],
    });

    if (!existedUser) {
      const newUser = await UserModel.create(userData);
      const accessToken = newUser.generateAccessToken();

      const { _id, email, username } = newUser.toObject();

      const user = { _id, email, username };

      return ResponseService.success(res, { user, accessToken });
    }

    return ResponseService.errorMessage(
      res,
      HttpStatus.BAD_REQUEST,
      "Please try different email"
    );
  } catch (err) {
    next(err);
  }
};

export default registerController;
