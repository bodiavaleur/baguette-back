import type { RequestHandler } from "express";
import UserModel from "~models/User";
import ResponseService from "~utils/ResponseService";
import { HttpStatus } from "~config/errors";
import DictionaryModel from "~models/Dictionary";
import { AuthErrorStrings } from "~config/strings/auth/errors";
import { DictionaryStrings } from "~config/strings/dictionary/dictionary";

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

      await DictionaryModel.create({
        user: newUser._id,
        dictionary: [],
        name: DictionaryStrings.DefaultDictionary,
        description: "",
        image: "",
      });

      return ResponseService.success(res, { user: userData, accessToken });
    }

    return ResponseService.errorMessage(
      res,
      HttpStatus.BAD_REQUEST,
      AuthErrorStrings.DifferentEmail
    );
  } catch (err) {
    next(err);
  }
};

export default registerController;
