import { RequestHandler } from "express";
import ResponseService from "~utils/ResponseService";
import { HttpStatus } from "~config/errors";
import { WordsErrorStrings } from "~config/strings/words/errors";
import DictionaryModel from "~models/Dictionary";

const getMyDictionaries: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const dictionary = await DictionaryModel.find({ user: userId });

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

export default getMyDictionaries;
