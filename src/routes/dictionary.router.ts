import { Router } from "express";
import { DICTIONARY_API } from "~config/api";
import authorized from "~middleware/authorized.middleware";
import getUserDictionary from "~controllers/dictionary/getUserDictionary.controller";

const DictionaryRouter = () => {
  const route = Router();

  route.get(DICTIONARY_API.USER_DICTIONARY, authorized, getUserDictionary);

  return route;
};

export default DictionaryRouter;
