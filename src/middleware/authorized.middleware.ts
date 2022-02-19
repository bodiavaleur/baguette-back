import { RequestHandler } from "express";
import ResponseService from "~utils/ResponseService";
import { HttpStatus } from "~config/errors";
import { AuthErrorStrings } from "~config/strings/auth/errors";
import { WHITELIST_AUTH_ENDPOINTS } from "~config/api";
import jwt, {JwtPayload} from "jsonwebtoken";
import { config } from "~config/config";
import UserModel from "~models/User";
import {UserDocument} from "~models/User/types";

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

        const user = jwtUser as UserDocument
        req.user = await UserModel.findById(user?._id);

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
