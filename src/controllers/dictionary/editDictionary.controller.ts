import { RequestHandler } from "express";
import Response from "~utils/Response";
import DictionaryModel from "~models/Dictionary";
import { HttpStatus } from "~config/errors";
import { WordsErrorStrings } from "~config/strings/words/errors";

const editDictionary: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const { dictionaryId, name, description, image } = req.body;
    const filter = { _id: dictionaryId, user: userId };
    const updateFields = { name, description, image };

    const dictionary = await DictionaryModel.findOneAndUpdate(
      filter,
      updateFields
    );

    if (dictionary) {
      const updatedDictionary = await DictionaryModel.findOne(filter);
      return Response.success(res, updatedDictionary);
    }

    return Response.errorMessage(
      res,
      HttpStatus.NOT_FOUND,
      WordsErrorStrings.NoDictionaryFound
    );
  } catch (err) {
    next(err);
  }
};

export default editDictionary;
