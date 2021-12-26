import { RequestHandler } from "express";
import Response from "~utils/Response";
import { HttpStatus } from "~config/errors";
import passport from "passport";

const passportMiddleware: RequestHandler = (req, res, next) => {
  try {
    // TODO: handle errors
    return passport.authenticate("local")(req, res, next);
  } catch (err) {
    Response.error(res, HttpStatus.NOT_FOUND);
  }
};

export default passportMiddleware;
