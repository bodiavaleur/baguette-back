import type { RequestHandler } from "express";
import UserModel from "~models/User";
import Response from "~utils/Response";
import { HttpStatus } from "~config/errors";
import DictionaryModel from "~models/Dictionary";
import { AuthErrorStrings } from "~config/strings/auth/errors";

const registerController: RequestHandler = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    const existedUser = await UserModel.findOne({
      $or: [{ email }, { username }],
    });

    if (!existedUser) {
      const newUser = await UserModel.create({ email, username, password });
      const accessToken = newUser.generateAccessToken();

      const userData = newUser.toObject();

      await DictionaryModel.create({ user: newUser._id, dictionary: [] });

      return Response.success(res, { user: userData, accessToken });
    }

    return Response.errorMessage(
      res,
      HttpStatus.BAD_REQUEST,
      AuthErrorStrings.DifferentEmail
    );
  } catch (err) {
    next(err);
  }
};

export default registerController;
