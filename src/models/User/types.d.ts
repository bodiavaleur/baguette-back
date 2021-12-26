import { WordDocument } from "~models/Word/types";

export interface UserDocument {
  _id: string;
  email: string;
  password: string;
  username: string;
  generateAccessToken: () => string;
  validatePassword: (password: string) => boolean;
}
