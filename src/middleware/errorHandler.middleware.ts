import { ErrorRequestHandler } from "express";
import ResponseService from "~utils/ResponseService";

const errorHandler: ErrorRequestHandler = (err, req, res) => {
  try {
    const error = err.name;

    switch (true) {
      case error === "ValidationError":
        return ResponseService.errorMessage(res, 400, err.message);

      case error === "SyntaxError":
        return ResponseService.errorMessage(res, 400, "Invalid request body");

      default:
        return ResponseService.errorMessage(res, 500, err.message);
    }
  } catch (err) {
    ResponseService.errorMessage(res, 500, "Something went wrong");
  }
};

export default errorHandler;
