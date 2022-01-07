import { RequestHandler } from "express";
import WordModel from "~models/Word";
import ResponseService from "~utils/ResponseService";
import { HttpStatus } from "~config/errors";
import { WordsErrorStrings } from "~config/strings/words/errors";

const { WordNotFound } = WordsErrorStrings;

const deleteWord: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const { wordId } = req.body;
    const filters = { _id: wordId, createdBy: userId };

    const word = await WordModel.findOneAndDelete(filters);

    if (word) {
      return ResponseService.success(res, word);
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

export default deleteWord;
