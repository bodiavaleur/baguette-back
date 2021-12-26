import { RequestHandler } from "express";
import UserModel from "~models/User";
import ResponseService from "~utils/ResponseService";
import { HttpStatus } from "~config/errors";
import WordModel from "~models/Word";

const addWordController: RequestHandler = async (req, res, next) => {
  try {
    const { userId, word, translation, image, example } = req.body;
    const wordData = { word, translation, image, example, createdBy: userId };

    const newWord = await WordModel.create(wordData);
    const user = await UserModel.findById({ _id: userId }).populate(
      "dictionary"
    );

    if (!user) {
      return ResponseService.errorMessage(
        res,
        HttpStatus.NOT_FOUND,
        "Cant find user"
      );
    }

    user.dictionary.push(newWord);
    user.save();

    ResponseService.success(res, {
      dictionary: user.dictionary,
    });
  } catch (err) {
    next(err);
  }
};

export default addWordController;
