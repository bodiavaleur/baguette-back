import type { Express } from "express";
import DictionaryRouter from "~routes/dictionary.router";

const RootRouter = (app: Express) => {
  app.use(DictionaryRouter());
};

export default RootRouter;
