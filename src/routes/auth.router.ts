import { Router } from "express";
import { AUTH_API } from "~config/api";
import registerController from "~controllers/auth/register.controller";
import loginController from "~controllers/auth/login.controller";

const AuthRouter = () => {
  const route = Router();

  route.post(AUTH_API.REGISTER, registerController);
  route.post(AUTH_API.LOGIN, loginController);

  return route;
};

export default AuthRouter;
