import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { Models } from "~config/models";
import { ACCESS_TOKEN_EXPIRE_TIME, Token } from "~config/token";
import type { UserDocument } from "~models/User/types";

const { User, Word } = Models;
const { ObjectId } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  dictionary: {
    type: [ObjectId],
    ref: Word,
  },
});

UserSchema.methods.generateAccessToken = function () {
  const payload = { _id: this._id, type: Token.Access };
  const expiresIn = ACCESS_TOKEN_EXPIRE_TIME;
  const jwtKey = process.env.JWT_SECRET ?? "";

  return jwt.sign(payload, jwtKey, { expiresIn });
};

UserSchema.methods.validatePassword = function (password) {
  return this.password === password;
};

const UserModel = mongoose.model<UserDocument>(User, UserSchema);

export default UserModel;
