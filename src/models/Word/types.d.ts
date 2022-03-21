import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

export interface WordDocument {
  word: string;
  translation: string;
  image: string;
  example: string;
  knowledgeLevel: number;
  createdBy: ObjectId;
  dictionaryId: ObjectId;
  createdAt: string;
  updatedAt: string;
}
