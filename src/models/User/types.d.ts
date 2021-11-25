import { WordDocument } from "~models/Word/types";

export interface UserDocument {
  email: string;
  password: string;
  username: string;
  dictionary: WordDocument[];
  generateAccessToken: () => string;
  validatePassword: (password: string) => boolean;
}
