import { Router } from "express";
import { WORDS_API } from "~config/api";
import { getWordsController } from "~controllers/words/getWords.controller";
import addWordController from "~controllers/words/addWord.controller";
import getWordByIdController from "~controllers/words/getWordById.controller";
import authorized from "~middleware/authorized.middleware";

const WordsRouter = () => {
  const route = Router();

  route.get(WORDS_API.GET_WORDS, authorized, getWordsController);
  route.get(WORDS_API.GET_WORD_DETAILS, getWordByIdController);

  route.post(WORDS_API.ADD_WORD, addWordController);

  route.delete(WORDS_API.DELETE_WORD, () => {});

  return route;
};

export default WordsRouter;
