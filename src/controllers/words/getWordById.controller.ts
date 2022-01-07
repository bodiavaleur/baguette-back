import { RequestHandler } from "express";
import WordModel from "~models/Word";
import ResponseService from "~utils/ResponseService";
import { HttpStatus } from "~config/errors";
import { WordsErrorStrings } from "~config/strings/words/errors";

const { WordNotFound } = WordsErrorStrings;

const getWordById: RequestHandler = async (req, res, next) => {
  try {
    const { wordId } = req.query;
    const word = await WordModel.findById(wordId);

    if (word) {
      return ResponseService.success(res, word);
    } else {
      return ResponseService.errorMessage(
        res,
        HttpStatus.NOT_FOUND,
        WordNotFound
      );
    }
  } catch (err) {
    next(err);
  }
};

export default getWordById;
