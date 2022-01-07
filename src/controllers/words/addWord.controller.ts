import { RequestHandler } from "express";
import ResponseService from "~utils/ResponseService";
import { HttpStatus } from "~config/errors";
import WordModel from "~models/Word";
import DictionaryModel from "~models/Dictionary";
import { DictionaryErrorString } from "~config/strings/dictionary/errors";

const { NotFound } = DictionaryErrorString;

const addWord: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const { dictionaryId, ...word } = req.body;

    const dictionary = await DictionaryModel.findOne({
      _id: dictionaryId,
      user: userId,
    });

    if (dictionary) {
      word.createdBy = userId;
      word.knowledgeLevel = 0;

      const newWord = await WordModel.create(word);

      dictionary.dictionary.push(newWord._id);
      dictionary.save();

      ResponseService.success(res, newWord);
    }

    return ResponseService.errorMessage(res, HttpStatus.NOT_FOUND, NotFound);
  } catch (err) {
    next(err);
  }
};

export default addWord;
