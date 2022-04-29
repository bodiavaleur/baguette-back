import mongoose, { PaginateModel } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { Collections, Models } from "~config/models";
import { WordDocument } from "./types";
import { WordType } from "~config/words";
import { Language } from "~config/language";

const { Word } = Models;
const { ObjectId } = mongoose.Schema.Types;

const WordSchema = new mongoose.Schema(
  {
    word: String,
    translations: [String],
    image: String,
    example: String,
    knowledgeLevel: Number,
    createdBy: ObjectId,
    dictionaryId: ObjectId,
    wordType: {
      type: String,
      enum: WordType,
      default: WordType.Word,
    },
    language: {
      type: String,
      enum: Language,
      default: Language.English,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

WordSchema.plugin(paginate);

const WordModel = mongoose.model<WordDocument, PaginateModel<WordDocument>>(
  Word,
  WordSchema,
  Collections.Words
);

export default WordModel;
