import mongoose from "mongoose";
import { Collections, Models } from "~config/models";
import { DictionaryDocument } from "./types";

const { ObjectId } = mongoose.Schema.Types;
const { Dictionary, Word } = Models;

const DictionarySchema = new mongoose.Schema(
  {
    _id: {
      type: ObjectId,
      auto: true,
    },
    user: ObjectId,
    dictionary: {
      type: [ObjectId],
      ref: Word,
    },
  },
  {
    timestamps: true,
  }
);

const DictionaryModel = mongoose.model<DictionaryDocument>(
  Dictionary,
  DictionarySchema,
  Collections.Dictionaries
);

export default DictionaryModel;
