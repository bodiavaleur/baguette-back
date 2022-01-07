import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT ?? 3000,
  jwtSecret: process.env.JWT_SECRET ?? "",
  mongoCloudUrl: process.env.MONGODB_CLOUD_URL ?? "",
  accessTokenExpireHours: process.env.ACCESS_TOKEN_EXPIRE_HOURS ?? 1,

  awsAccessKey: process.env.AWS_ACCESS_KEY ?? "",
  awsSecretKey: process.env.AWS_SECRET_KEY ?? "",
  awsBucketName: process.env.AWS_BUCKET_NAME ?? "",
  awsBucketUserImages: process.env.AWS_BUCKET_USER_IMAGES ?? "",
  awsBucketWordImages: process.env.AWS_BUCKET_WORD_IMAGES ?? "",
  awsBucketDictionaryImages: process.env.AWS_BUCKET_DICTIONARY_IMAGES ?? "",
};
