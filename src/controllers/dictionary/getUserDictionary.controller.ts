import { RequestHandler } from "express";
import Response from "~utils/Response";
import { HttpStatus } from "~config/errors";
import { WordsErrorStrings } from "~config/strings/words/errors";
import DictionaryModel from "~models/Dictionary";

const getUserDictionary: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const dictionary = await DictionaryModel.findOne({ user: userId });

    if (dictionary) {
      const dictionaryWithWords = await dictionary.populate("dictionary");
      return Response.success(res, dictionaryWithWords);
    } else {
      return Response.errorMessage(
        res,
        HttpStatus.NOT_FOUND,
        WordsErrorStrings.NoDictionaryFound
      );
    }
  } catch (err) {
    next(err);
  }
};

export default getUserDictionary;
