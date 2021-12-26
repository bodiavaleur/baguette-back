import { Strategy, VerifyFunction } from "passport-local";
import UserModel from "~models/User";
import passport from "passport";
import { AuthErrorStrings } from "~config/strings/auth/errors";

const options = {
  usernameField: "email",
  passwordField: "password",
};

const verify: VerifyFunction = async (email, password, done) => {
  const existedUser = await UserModel.findOne({ email });
  const isVerified = existedUser && existedUser.validatePassword(password);

  if (isVerified) {
    return done(null, existedUser);
  }

  return done(null, false, { message: AuthErrorStrings.InvalidCredentials });
};

const passportStrategy = new Strategy(options, verify);

passport.use(passportStrategy);
