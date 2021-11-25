import mongoose from "mongoose";
import { Models } from "~config/models";
import { WordDocument } from "~models/Word/types";

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

const WordModel = mongoose.model<WordDocument>(Word, WordSchema);

export default WordModel;
