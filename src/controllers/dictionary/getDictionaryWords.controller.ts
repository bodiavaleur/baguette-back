import { RequestHandler } from "express";
import ResponseService from "~utils/ResponseService";
import WordModel from "~models/Word";
import { paginateOptions } from "~helpers/pagination";

const getDictionaryWords: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const dictionaryId = req.query.dictionaryId;
    const page = req.query.page as string;
    const query = { dictionaryId, createdBy: userId };

    const words = await WordModel.paginate(query, paginateOptions(page));

    return ResponseService.success(res, words);
  } catch (err) {
    next(err);
  }
};

export default getDictionaryWords;
