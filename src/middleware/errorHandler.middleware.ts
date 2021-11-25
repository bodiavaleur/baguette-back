import { ErrorRequestHandler } from "express";
import ResponseService from "~utils/ResponseService";

const ErrorHandlerMiddleware: ErrorRequestHandler = (err, req, res) => {
  try {
    const error = err.name;

    switch (true) {
      case error === "ValidationError":
        return ResponseService.errorMessage(res, 400, err.message);

      case error === "SyntaxError":
        return ResponseService.errorMessage(res, 400, "Invalid request body");

      case err.code && err.code === 11000:
        const [key] = Object.keys(err.keyValue);
        return ResponseService.errorMessage(
          res,
          400,
          `Field ${key} is already exist`
        );

      default:
        return ResponseService.errorMessage(res, 500, err.message);
    }
  } catch (err) {
    ResponseService.errorMessage(res, 500, "Something went wrong");
  }
};

export default ErrorHandlerMiddleware;
