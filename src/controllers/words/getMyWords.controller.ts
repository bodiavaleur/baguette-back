import { RequestHandler } from "express";
import ResponseService from "~utils/ResponseService";
import WordModel from "~models/Word";
import { paginateOptions } from "~helpers/pagination";
import { WordType } from "~config/words";
import { Language } from "~config/language";

const getMyWords: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const page = req.query.page as string;
    const wordType = req.query.wordType as WordType;
    const language = req.query.language as Language;
    const query = {
      createdBy: userId,
      ...(wordType && { wordType }),
      language,
    };
    const sort = { createdAt: -1 };

    const words = await WordModel.paginate(
      query,
      paginateOptions(page, { sort })
    );

    return ResponseService.success(res, words);
  } catch (err) {
    next(err);
  }
};

export default getMyWords;
