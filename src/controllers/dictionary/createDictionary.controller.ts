import { RequestHandler } from "express";
import ResponseService from "~utils/ResponseService";
import DictionaryModel from "~models/Dictionary";

const createDictionary: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const { name, description, image, language } = req.body;
    const newDictionaryFields = {
      user: userId,
      name,
      description,
      image,
      language,
    };

    const newDictionary = await DictionaryModel.create(newDictionaryFields);

    return ResponseService.success(res, newDictionary);
  } catch (err) {
    next(err);
  }
};

export default createDictionary;
