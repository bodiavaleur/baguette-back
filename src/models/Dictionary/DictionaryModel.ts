import mongoose, { PaginateModel } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { Collections, Models } from "~config/models";
import { DictionaryDocument } from "./types";
import { Language } from "~config/language";
import { WordDocument } from "~models/Word/types";

const { ObjectId } = mongoose.Schema.Types;
const { Dictionary } = Models;

const DictionarySchema = new mongoose.Schema(
  {
    _id: {
      type: ObjectId,
      auto: true,
    },
    user: ObjectId,
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
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

DictionarySchema.plugin(paginate);

const DictionaryModel = mongoose.model<
  DictionaryDocument,
  PaginateModel<WordDocument>
>(Dictionary, DictionarySchema, Collections.Dictionaries);

export default DictionaryModel;
