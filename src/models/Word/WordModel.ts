import mongoose from "mongoose";
import { Collections, Models } from "~config/models";
import { WordDocument } from "./types";

const { Word } = Models;

const WordSchema = new mongoose.Schema(
  {
    word: String,
    translation: String,
    image: String,
    example: String,
    knowledgeLevel: Number,
    createdBy: String,
  },
  {
    timestamps: true,
  }
);

const WordModel = mongoose.model<WordDocument>(
  Word,
  WordSchema,
  Collections.Words
);

export default WordModel;
