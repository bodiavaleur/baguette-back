import { RequestHandler } from "express";
import ResponseService from "~utils/ResponseService";
import { HttpStatus } from "~config/errors";
import { WordsErrorStrings } from "~config/strings/words/errors";
import { FLASHCARD_TRAINING_INTENSITY, Intensity } from "~config/training";
import WordModel from "~models/Word";

const trainFlashcard: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const wordId = req.body.wordId;
    const action: Intensity = req.body.action;

    const word = await WordModel.findById({ _id: wordId, createdBy: userId });

    if (word) {
      if (action === Intensity.Increase) {
        word.knowledgeLevel += FLASHCARD_TRAINING_INTENSITY;
      }

      if (action === Intensity.Decrease) {
        word.knowledgeLevel -= FLASHCARD_TRAINING_INTENSITY;
      }

      word.save();
      return ResponseService.success(res, word);
    } else {
      return ResponseService.errorMessage(
        res,
        HttpStatus.NOT_FOUND,
        WordsErrorStrings.WordNotFound
      );
    }
  } catch (err) {
    next(err);
  }
};

export default trainFlashcard;
