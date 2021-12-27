import "module-alias/register";
import express from "express";
import mongoose from "mongoose";
import RootRouter from "~routes/root.router";
import errorHandler from "~middleware/errorHandler.middleware";
import "~types/express";
import { config } from "~config/config";

const app = express();

app.use(express.json());

RootRouter(app);

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`[*] Server successfully started at: ${config.port}`);
});

mongoose.connect(config.mongoCloudUrl).then(() => {
  console.log("[*] MongoDB database is connected");
});
