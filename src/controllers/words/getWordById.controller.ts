import { RequestHandler } from "express";
import WordModel from "~models/Word";
import Response from "~utils/Response";
import { HttpStatus } from "~config/errors";
import { WordsErrorStrings } from "~config/strings/words/errors";

const { WordNotFound } = WordsErrorStrings;

const getWordById: RequestHandler = async (req, res, next) => {
  try {
    const { wordId } = req.query;
    const word = await WordModel.findById(wordId);

    if (word) {
      return Response.success(res, word);
    } else {
      return Response.errorMessage(res, HttpStatus.NOT_FOUND, WordNotFound);
    }
  } catch (err) {
    next(err);
  }
};

export default getWordById;
