import { RequestHandler } from "express";
import ResponseService from "~utils/ResponseService";
import { HttpStatus } from "~config/errors";
import { AuthErrorStrings } from "~config/strings/auth/errors";

const authorized: RequestHandler = (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      return next();
    }

    ResponseService.errorMessage(
      res,
      HttpStatus.NOT_AUTHORIZED,
      AuthErrorStrings.AuthFailure
    );
  } catch (err) {
    ResponseService.error(res, HttpStatus.NOT_FOUND);
  }
};

export default authorized;
