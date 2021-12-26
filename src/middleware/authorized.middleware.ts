import { RequestHandler } from "express";
import Response from "~utils/Response";
import { HttpStatus } from "~config/errors";
import { AuthErrorStrings } from "~config/strings/auth/errors";

const authorized: RequestHandler = (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      return next();
    }

    Response.errorMessage(
      res,
      HttpStatus.NOT_AUTHORIZED,
      AuthErrorStrings.AuthFailure
    );
  } catch (err) {
    Response.error(res, HttpStatus.NOT_FOUND);
  }
};

export default authorized;
