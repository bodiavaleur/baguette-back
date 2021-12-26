import { RequestHandler } from "express";
import ResponseService from "~utils/ResponseService";
import { HttpStatus } from "~config/errors";
import passport from "passport";

const passportMiddleware: RequestHandler = (req, res, next) => {
  try {
    return passport.authenticate("local", (err, user, info) => {
      if (err) {
        next(err);
      }

      if (!user) {
        return ResponseService.errorMessage(
          res,
          HttpStatus.BAD_REQUEST,
          info.message
        );
      }

      req.user = user;
      next();
    })(req, res, next);
  } catch (err) {
    ResponseService.error(res, HttpStatus.NOT_FOUND);
  }
};

export default passportMiddleware;
