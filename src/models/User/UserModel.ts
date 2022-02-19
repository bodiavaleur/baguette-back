import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { Collections, Models } from "~config/models";
import { Token } from "~config/token";
import type { UserDocument } from "./types";
import { config } from "~config/config";

const { User, Word } = Models;
const { ObjectId } = mongoose.Schema.Types;

export const UserSchema = new mongoose.Schema({
  _id: {
    type: ObjectId,
    auto: true,
  },
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
});

UserSchema.methods.generateAccessToken = function () {
  const payload = { _id: this._id, type: Token.Access };
  const expiresIn = Number(config.accessTokenExpireHours) * 60 * 60;
  const jwtKey = config.jwtSecret;

  return jwt.sign(payload, jwtKey, { expiresIn });
};

UserSchema.methods.validatePassword = function (password: string) {
  return this.password === password;
};

const UserModel = mongoose.model<UserDocument>(
  User,
  UserSchema,
  Collections.Users
);

export default UserModel;
