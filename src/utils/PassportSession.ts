import { Express } from "express";
import passport from "passport";
import session from "express-session";
import UserModel from "~models/User";
import MongoStore from "connect-mongo";
import { config } from "~config/config";

const COOKIE_AGE = Number(config.passportCookieAgeHours) * 60 * 60 * 1000;

const PassportSession = (app: Express) => {
  const sessionConfig = {
    secret: config.passportSecret,
    cookie: { maxAge: COOKIE_AGE },
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: config.mongoCloudUrl }),
  };

  app.use(session(sessionConfig));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user.email);
  });

  passport.deserializeUser(async (email, done) => {
    try {
      const user = await UserModel.findOne({ email: String(email) });

      if (user) {
        return done(null, user);
      }
    } catch (err) {
      done(err, null);
    }
  });
};

export default PassportSession;
