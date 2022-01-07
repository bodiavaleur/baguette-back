import { RequestHandler } from "express";
import WordModel from "~models/Word";
import ResponseService from "~utils/ResponseService";
import { HttpStatus } from "~config/errors";
import { WordsErrorStrings } from "~config/strings/words/errors";

const { WordNotFound } = WordsErrorStrings;

const editWord: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const { wordId, ...wordFields } = req.body;
    const filters = { _id: wordId, createdBy: userId };

    const word = await WordModel.findOneAndUpdate(filters, wordFields);

    if (word) {
      const updatedWord = await WordModel.findOne(filters);

      return ResponseService.success(res, updatedWord);
    }

    return ResponseService.errorMessage(
      res,
      HttpStatus.NOT_FOUND,
      WordNotFound
    );
  } catch (err) {
    next(err);
  }
};

export default editWord;
