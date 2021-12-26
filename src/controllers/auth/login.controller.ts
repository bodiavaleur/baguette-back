import { RequestHandler } from "express";
import UserModel from "~models/User";
import Response from "~utils/Response";
import { HttpStatus } from "~config/errors";

const loginController: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    const validatedPassword = user?.validatePassword(password);

    if (user) {
      const userData = user.toObject();

      const accessToken = user.generateAccessToken();

      return Response.success(res, { user: userData, accessToken });
    }

    if (!user || !validatedPassword) {
      return Response.errorMessage(res, HttpStatus.NOT_FOUND, "user not found");
    }
  } catch (err) {
    next(err);
  }
};

export default loginController;
