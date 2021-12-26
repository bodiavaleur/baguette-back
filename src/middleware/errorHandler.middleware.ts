import { ErrorRequestHandler } from "express";
import Response from "~utils/Response";

const errorHandler: ErrorRequestHandler = (err, req, res) => {
  try {
    const error = err.name;

    switch (true) {
      case error === "ValidationError":
        return Response.errorMessage(res, 400, err.message);

      case error === "SyntaxError":
        return Response.errorMessage(res, 400, "Invalid request body");

      default:
        return Response.errorMessage(res, 500, err.message);
    }
  } catch (err) {
    Response.errorMessage(res, 500, "Something went wrong");
  }
};

export default errorHandler;
