import { RequestHandler } from "express";
import ResponseService from "~utils/ResponseService";
import { HttpStatus } from "~config/errors";
import { WordsErrorStrings } from "~config/strings/words/errors";
import { isNewWord, isWordLearned, isWordStudying } from "~helpers/words";
import WordModel from "~models/Word";

const getDictionaryStats: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const { dictionaryId } = req.query;
    const query = { dictionaryId, createdBy: userId };

    const words = await WordModel.find(query);

    if (words) {
      const newWords = words.filter(isNewWord);
      const studyingWords = words.filter(isWordStudying);
      const learnedWords = words.filter(isWordLearned);

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
