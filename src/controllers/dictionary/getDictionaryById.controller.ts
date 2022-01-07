import { RequestHandler } from "express";
import ResponseService from "~utils/ResponseService";
import { HttpStatus } from "~config/errors";
import { WordsErrorStrings } from "~config/strings/words/errors";
import DictionaryModel from "~models/Dictionary";

const getDictionaryById: RequestHandler = async (req, res, next) => {
  try {
    const { dictionaryId } = req.query;
    const dictionary = await DictionaryModel.findById(dictionaryId).populate(
      "dictionary"
    );

    if (dictionary) {
      return ResponseService.success(res, dictionary);
    } else {
      return ResponseService.errorMessage(
        res,
        HttpStatus.NOT_FOUND,
        WordsErrorStrings.NoDictionaryFound
      );
    }
  } catch (err) {
    next(err);
  }
};

export default getDictionaryById;
