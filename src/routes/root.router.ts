import type { Express } from "express";
import AuthRouter from "~routes/auth.router";
import WordsRouter from "~routes/words.router";
import DictionaryRouter from "~routes/dictionary.router";

const RootRouter = (app: Express) => {
  app.use(AuthRouter());
  app.use(DictionaryRouter());
  app.use(WordsRouter());
};

export default RootRouter;
