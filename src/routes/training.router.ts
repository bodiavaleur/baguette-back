import { Router } from "express";
import { TRAINING_API } from "~config/api";
import authorized from "~middleware/authorized.middleware";
import trainFlashcard from "~controllers/training/trainFlashcard.controller";

const { FLASHCARD } = TRAINING_API;

const TrainingRouter = () => {
  const route = Router();

  route.post(FLASHCARD, authorized, trainFlashcard);

  return route;
};

export default TrainingRouter;
