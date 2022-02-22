import { RequestHandler } from "express";
import ResponseService from "~utils/ResponseService";
import { HttpStatus } from "~config/errors";
import { WordsErrorStrings } from "~config/strings/words/errors";
import DictionaryModel from "~models/Dictionary";
import { isNewWord, isWordLearned, isWordStudying } from "~helpers/words";

const getDictionaryStats: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const { dictionaryId } = req.query;
    const query = { _id: dictionaryId, user: userId };

    const dictionary = await DictionaryModel.findOne(query).populate({
      path: "dictionary",
    });

    if (dictionary) {
      const newWords = dictionary.dictionary.filter(isNewWord);
      const studyingWords = dictionary.dictionary.filter(isWordStudying);
      const learnedWords = dictionary.dictionary.filter(isWordLearned);

      return ResponseService.success(res, {
        newCount: newWords.length,
        studyingCount: studyingWords.length,
        learnedCount: learnedWords.length,
      });
    } else {
      return ResponseService.errorMessage(
        res,
        HttpStatus.NOT_FOUND,
        WordsErrorStrings.NoDictionaryFound
      );
    }
  } catch (err) {
    next(err);
  }
};

export default getDictionaryStats;
