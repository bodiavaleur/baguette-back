import { RequestHandler } from "express";
import ResponseService from "~utils/ResponseService";
import { HttpStatus } from "~config/errors";
import { WordsErrorStrings } from "~config/strings/words/errors";
import DictionaryModel from "~models/Dictionary";
import { Language } from "~config/language";
import { paginateOptions } from "~helpers/pagination";

const getMyDictionaries: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const language = req.query.language as Language;
    const page = req.query.page as string;
    const query = { user: userId, language };
    const sort = { createdAt: -1 };

    const dictionary = await DictionaryModel.paginate(
      query,
      paginateOptions(page, { sort })
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

export default getMyDictionaries;
