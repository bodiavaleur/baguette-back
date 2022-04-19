import { RequestHandler } from "express";
import ResponseService from "~utils/ResponseService";
import WordModel from "~models/Word";
import { paginateOptions } from "~helpers/pagination";
import { WordType } from "~config/words";

const getDictionaryWords: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const dictionaryId = req.query.dictionaryId;
    const page = req.query.page as string;
    const wordType = req.query.wordType as WordType;
    const query = {
      dictionaryId,
      createdBy: userId,
      ...(wordType && { wordType }),
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

export default getDictionaryWords;
