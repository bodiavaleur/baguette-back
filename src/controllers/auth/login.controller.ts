import { RequestHandler } from "express";
import UserModel from "~models/User";
import ResponseService from "~utils/ResponseService";

const loginController: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user || !user.validatePassword(password)) {
      return ResponseService.errorMessage(res, 404, "user not found");
    }

    const accessToken = user.generateAccessToken();

    ResponseService.success(res, {
      user: {
        email: user.email,
        username: user.username,
      },
      accessToken,
    });
  } catch (err) {
    next(err);
  }
};

export default loginController;
