import { WordDocument } from "~models/Word/types";
import {
  WORD_MAX_KNOWLEDGE_LEVEL,
  WORD_MIN_KNOWLEDGE_LEVEL,
} from "~config/words";

export const isNewWord = (word: WordDocument) =>
  word.knowledgeLevel === WORD_MIN_KNOWLEDGE_LEVEL;

export const isWordStudying = (word: WordDocument) =>
  word.knowledgeLevel > WORD_MIN_KNOWLEDGE_LEVEL &&
  word.knowledgeLevel < WORD_MAX_KNOWLEDGE_LEVEL;

export const isWordLearned = (word: WordDocument) =>
  word.knowledgeLevel === WORD_MAX_KNOWLEDGE_LEVEL;
