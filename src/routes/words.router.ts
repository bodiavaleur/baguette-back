import { Router } from "express";
import { WORDS_API } from "~config/api";
import addWord from "~controllers/words/addWord.controller";
import getWordById from "~controllers/words/getWordById.controller";
import authorized from "~middleware/authorized.middleware";

const WordsRouter = () => {
  const route = Router();

  route.get(WORDS_API.GET_WORD_DETAILS, authorized, getWordById);
  route.post(WORDS_API.ADD_WORD, authorized, addWord);

  return route;
};

export default WordsRouter;
