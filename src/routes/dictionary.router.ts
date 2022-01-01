import { Router } from "express";
import { DICTIONARY_API } from "~config/api";
import authorized from "~middleware/authorized.middleware";
import getUserDictionary from "~controllers/dictionary/getUserDictionary.controller";
import createDictionary from "~controllers/dictionary/createDictionary.controller";
import editDictionary from "~controllers/dictionary/editDictionary.controller";

const DictionaryRouter = () => {
  const route = Router();

  route.get(DICTIONARY_API.USER_DICTIONARY, authorized, getUserDictionary);
  route.post(DICTIONARY_API.CREATE, authorized, createDictionary);
  route.put(DICTIONARY_API.EDIT, authorized, editDictionary);

  return route;
};

export default DictionaryRouter;
