import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT ?? 3000,
  jwtSecret: process.env.JWT_SECRET ?? "",
  mongoCloudUrl: process.env.MONGODB_CLOUD_URL ?? "",
  passportSecret: process.env.PASSPORT_SECRET ?? "",
  passportCookieAgeHours: process.env.PASSPORT_COOKIE_AGE_HOURS ?? 1,
};
