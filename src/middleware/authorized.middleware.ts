import { RequestHandler } from "express";
import ResponseService from "~utils/ResponseService";
import { HttpStatus } from "~config/errors";
import { AuthErrorStrings } from "~config/strings/auth/errors";
import { WHITELIST_AUTH_ENDPOINTS } from "~config/api";
import jwt from "jsonwebtoken";
import { config } from "~config/config";
import UserModel from "~models/User";

const authorized: RequestHandler = (req, res, next) => {
  try {
    const isWhiteListed = WHITELIST_AUTH_ENDPOINTS.includes(req.originalUrl);
    const [_, token] = req.headers.authorization?.split(" ") ?? [];

    if (isWhiteListed) {
      return next();
    }

    if (token) {
      return jwt.verify(token, config.jwtSecret, async (err, jwtUser) => {
        if (err) {
          return ResponseService.errorMessage(
            res,
            HttpStatus.NOT_AUTHORIZED,
            AuthErrorStrings.AuthFailure
          );
        }

        req.user = await UserModel.findById(jwtUser?._id);

        next();
      });
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
