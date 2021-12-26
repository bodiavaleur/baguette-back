import { Router } from "express";
import { AUTH_API } from "~config/api";
import registerController from "~controllers/auth/register.controller";
import loginController from "~controllers/auth/login.controller";
import passportMiddleware from "~middleware/passport.middleware";

const AuthRouter = () => {
  const route = Router();

  route.post(AUTH_API.REGISTER, registerController);
  route.post(AUTH_API.LOGIN, passportMiddleware, loginController);

  return route;
};

export default AuthRouter;
