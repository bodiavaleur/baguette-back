import { RequestHandler } from "express";
import Response from "~utils/Response";
import { HttpStatus } from "~config/errors";
import { WordsErrorStrings } from "~config/strings/words/errors";
import DictionaryModel from "~models/Dictionary";

const getUserDictionary: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const dictionary = await DictionaryModel.find({ user: userId }).populate({
      path: "dictionary",
    });

    if (dictionary) {
      return Response.success(res, dictionary);
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
