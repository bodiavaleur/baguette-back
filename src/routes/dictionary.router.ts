import { Router } from "express";
import { DICTIONARY_API } from "~config/api";
import { getWordsController } from "~controllers/dictionary/getWords.controller";

const DictionaryRouter = () => {
  const route = Router();

  route.get(DICTIONARY_API.GET_WORDS, getWordsController);
  route.get(DICTIONARY_API.GET_WORD_DETAILS, () => {});

  route.post(DICTIONARY_API.ADD_WORD, () => {});

  route.delete(DICTIONARY_API.DELETE_WORD, () => {});

  return route;
};

export default DictionaryRouter;
