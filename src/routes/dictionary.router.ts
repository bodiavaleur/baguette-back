import { Router } from "express";
import { DICTIONARY_API } from "~config/api";
import authorized from "~middleware/authorized.middleware";
import getUserDictionary from "~controllers/dictionary/getUserDictionary.controller";
import createDictionary from "~controllers/dictionary/createDictionary.controller";
import editDictionary from "~controllers/dictionary/editDictionary.controller";
import getDictionaryById from "~controllers/dictionary/getDictionaryById.controller";

const { USER_DICTIONARY, GET_BY_ID, CREATE, EDIT } = DICTIONARY_API;

const DictionaryRouter = () => {
  const route = Router();

  route.get(USER_DICTIONARY, authorized, getUserDictionary);
  route.get(GET_BY_ID, authorized, getDictionaryById);
  route.post(CREATE, authorized, createDictionary);
  route.put(EDIT, authorized, editDictionary);

  return route;
};

export default DictionaryRouter;
