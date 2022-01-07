import { RequestHandler } from "express";
import WordModel from "~models/Word";
import ResponseService from "~utils/ResponseService";
import { HttpStatus } from "~config/errors";
import { WordsErrorStrings } from "~config/strings/words/errors";

const uploadWordImage: RequestHandler = async (req, res, next) => {
  try {
    const { wordId } = req.body;
    const file = req.file as Express.MulterS3.File;
    const userId = req.user?._id;
    const filter = { createdBy: userId, _id: wordId };

    const word = await WordModel.findOneAndUpdate(filter, {
      image: file.location ?? "",
    });

    if (word) {
      const updatedWord = await WordModel.findOne(filter);

      return ResponseService.success(res, updatedWord);
    }

    ResponseService.errorMessage(
      res,
      HttpStatus.NOT_FOUND,
      WordsErrorStrings.WordNotFound
    );
  } catch (err) {
    next(err);
  }
};

export default uploadWordImage;
