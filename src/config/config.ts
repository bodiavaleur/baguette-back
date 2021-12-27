import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT ?? 3000,
  jwtSecret: process.env.JWT_SECRET ?? "",
  mongoCloudUrl: process.env.MONGODB_CLOUD_URL ?? "",
  accessTokenExpireHours: process.env.ACCESS_TOKEN_EXPIRE_HOURS ?? 1,
};
