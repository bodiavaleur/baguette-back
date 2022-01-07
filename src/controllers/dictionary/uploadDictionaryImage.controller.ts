import { RequestHandler } from "express";
import ResponseService from "~utils/ResponseService";
import { HttpStatus } from "~config/errors";
import DictionaryModel from "~models/Dictionary";
import { DictionaryErrorString } from "~config/strings/dictionary/errors";

const uploadDictionaryImage: RequestHandler = async (req, res, next) => {
  try {
    const { dictionaryId } = req.body;
    const file = req.file as Express.MulterS3.File;
    const userId = req.user?._id;
    const filter = { user: userId, _id: dictionaryId };

    const dictionary = await DictionaryModel.findOneAndUpdate(filter, {
      image: file.location ?? "",
    });

    if (dictionary) {
      const updatedDictionary = await DictionaryModel.findOne(filter);

      return ResponseService.success(res, updatedDictionary);
    }

    ResponseService.errorMessage(
      res,
      HttpStatus.NOT_FOUND,
      DictionaryErrorString.NotFound
    );
  } catch (err) {
    next(err);
  }
};

export default uploadDictionaryImage;
