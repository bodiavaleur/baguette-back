import { Router } from "express";
import { WORDS_API } from "~config/api";
import addWord from "~controllers/words/addWord.controller";
import getWordById from "~controllers/words/getWordById.controller";
import authorized from "~middleware/authorized.middleware";
import editWord from "~controllers/words/editWord.controller";
import deleteWord from "~controllers/words/deleteWord.controller";
import uploadWordImage from "~controllers/words/uploadWordImage.controller";
import uploadS3 from "~middleware/uploadS3.middleware";
import { BUCKETS } from "~config/s3";

const { WORD_DETAILS, ADD, EDIT, DELETE, UPLOAD_IMAGE } = WORDS_API;

const WordsRouter = () => {
  const route = Router();

  route.get(WORD_DETAILS, authorized, getWordById);
  route.post(ADD, authorized, addWord);
  route.put(EDIT, authorized, editWord);
  route.delete(DELETE, authorized, deleteWord);
  route.post(
    UPLOAD_IMAGE,
    authorized,
    uploadS3(BUCKETS.WORD_IMAGES).single("image"),
    uploadWordImage
  );

  return route;
};

export default WordsRouter;
