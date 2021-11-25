import type { RequestHandler } from "express";
import UserModel from "~models/User";
import ResponseService from "~utils/ResponseService";

const registerController: RequestHandler = async (req, res, next) => {
  try {
    const userData = { ...req.body, dictionary: [] };
    const newUser = await UserModel.create(userData);
    const accessToken = newUser.generateAccessToken();

    const { _id, email, username } = newUser.toObject();

    const user = { _id, email, username };

    ResponseService.success(res, { user, accessToken });
  } catch (err) {
    next(err);
  }
};

export default registerController;
