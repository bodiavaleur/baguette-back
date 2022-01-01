import { Router } from "express";
import { WORDS_API } from "~config/api";
import addWord from "~controllers/words/addWord.controller";
import getWordById from "~controllers/words/getWordById.controller";
import authorized from "~middleware/authorized.middleware";
import editWord from "~controllers/words/editWord.controller";
import deleteWord from "~controllers/words/deleteWord.controller";

const { WORD_DETAILS, ADD, EDIT, DELETE } = WORDS_API;

const WordsRouter = () => {
  const route = Router();

  route.get(WORD_DETAILS, authorized, getWordById);
  route.post(ADD, authorized, addWord);
  route.put(EDIT, authorized, editWord);
  route.delete(DELETE, authorized, deleteWord);

  return route;
};

export default WordsRouter;
