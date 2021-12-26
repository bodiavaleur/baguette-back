import { RequestHandler } from "express";
import WordModel from "~models/Word";
import ResponseService from "~utils/ResponseService";
import { HttpStatus } from "~config/errors";

const getWordByIdController: RequestHandler = async (req, res, next) => {
  try {
    const { wordId } = req.query;
    const word = await WordModel.findById(wordId);

    if (word) {
      return ResponseService.success(res, word);
    } else {
      return ResponseService.errorMessage(
        res,
        HttpStatus.NOT_FOUND,
        "Word does not exist"
      );
    }
  } catch (err) {
    next(err);
  }
};

export default getWordByIdController;
