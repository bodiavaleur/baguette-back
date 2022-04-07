import { RequestHandler } from "express";
import ResponseService from "~utils/ResponseService";
import WordModel from "~models/Word";
import { paginateOptions } from "~helpers/pagination";
import { WordType } from "~config/words";

const getMyWords: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const page = req.query.page as string;
    const wordType = req.query.wordType as WordType;
    const query = {
      createdBy: userId,
      ...(wordType && { wordType }),
    };

    const words = await WordModel.paginate(query, paginateOptions(page));

    return ResponseService.success(res, words);
  } catch (err) {
    next(err);
  }
};

export default getMyWords;
