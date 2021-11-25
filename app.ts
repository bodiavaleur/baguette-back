import "module-alias/register";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import RootRouter from "~routes/root.router";
import ErrorHandlerMiddleware from "~middleware/errorHandler.middleware";

dotenv.config();

const app = express();

app.use(express.json());

RootRouter(app);

app.use(ErrorHandlerMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`[*] Server successfully started at: ${process.env.PORT}`);
});

mongoose.connect(process.env.MONGODB_CLOUD_URL ?? "").then(() => {
  console.log("[*] MongoDB database is connected");
});
