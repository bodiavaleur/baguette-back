import type { RequestHandler } from "express";
import UserModel from "~models/User";
import ResponseService from "~utils/ResponseService";
import { HttpStatus } from "~config/errors";

export const getWordsController: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.query;
    const user = await UserModel.findById(userId);

    console.log("[*] req.user: ", req.user);

    if (!user) {
      return ResponseService.errorMessage(
        res,
        HttpStatus.NOT_FOUND,
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
