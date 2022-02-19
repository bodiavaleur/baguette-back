import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

export interface DictionaryDocument {
  user: string;
  dictionary: ObjectId[];
  createdAt: string;
  updatedAt: string;
}
