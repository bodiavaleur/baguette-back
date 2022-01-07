import { Router } from "express";
import { DICTIONARY_API } from "~config/api";
import authorized from "~middleware/authorized.middleware";
import getUserDictionary from "~controllers/dictionary/getUserDictionary.controller";
import createDictionary from "~controllers/dictionary/createDictionary.controller";
import editDictionary from "~controllers/dictionary/editDictionary.controller";
import getDictionaryById from "~controllers/dictionary/getDictionaryById.controller";
import uploadS3 from "~middleware/uploadS3.middleware";
import uploadDictionaryImage from "~controllers/dictionary/uploadDictionaryImage.controller";
import { BUCKETS } from "~config/s3";

const { USER_DICTIONARY, GET_BY_ID, CREATE, EDIT, UPLOAD_IMAGE } =
  DICTIONARY_API;

const DictionaryRouter = () => {
  const route = Router();

  route.get(USER_DICTIONARY, authorized, getUserDictionary);
  route.get(GET_BY_ID, authorized, getDictionaryById);
  route.post(CREATE, authorized, createDictionary);
  route.put(EDIT, authorized, editDictionary);
  route.post(
    UPLOAD_IMAGE,
    authorized,
    uploadS3(BUCKETS.DICTIONARY_IMAGES).single("image"),
    uploadDictionaryImage
  );

  return route;
};

export default DictionaryRouter;
