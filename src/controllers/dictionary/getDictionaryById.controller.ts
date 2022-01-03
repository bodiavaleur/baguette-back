import { RequestHandler } from "express";
import Response from "~utils/Response";
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

export default getDictionaryById;
