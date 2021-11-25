import type { Express } from "express";
import AuthRouter from "~routes/auth.router";
import WordsRouter from "~routes/words.router";

const RootRouter = (app: Express) => {
  app.use(AuthRouter());
  app.use(WordsRouter());
};

export default RootRouter;
