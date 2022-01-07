import AWS from "aws-sdk";
import { config } from "~config/config";
import multer from "multer";
import multerS3 from "multer-s3";

const s3 = new AWS.S3({
  accessKeyId: config.awsAccessKey,
  secretAccessKey: config.awsSecretKey,
});

const uploadS3 = (bucket: string) =>
  multer({
    storage: multerS3({
      s3,
      bucket,
      acl: "public-read",
      metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
      },
      key: (req, file, cb) => {
        const [_, extension] = file.mimetype.split("/");
        const fileName = `${Date.now().toString()}.${extension}`;
        cb(null, fileName);
      },
    }),
  });

export default uploadS3;
