import { RequestHandler } from "express";
import Response from "~utils/Response";
import DictionaryModel from "~models/Dictionary";

const createDictionary: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const { name, description, image } = req.body;
    const newDictionaryFields = {
      user: userId,
      dictionary: [],
      name,
      description,
      image,
    };

    const newDictionary = await DictionaryModel.create(newDictionaryFields);

    return Response.success(res, newDictionary);
  } catch (err) {
    next(err);
  }
};

export default createDictionary;
