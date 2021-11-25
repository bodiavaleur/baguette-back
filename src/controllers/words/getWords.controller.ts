import type { RequestHandler } from "express";
import UserModel from "~models/User";
import ResponseService from "~utils/ResponseService";
import { HttpStatusCode } from "~config/errors";

export const getWordsController: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.query;
    const user = await UserModel.findById(userId);

    if (!user) {
      return ResponseService.errorMessage(
        res,
        HttpStatusCode.NOT_FOUND,
        "Cant find user dictionary"
      );
    }

    ResponseService.success(res, {
      dictionary: user.dictionary,
    });
  } catch (err) {
    next(err);
  }
};
