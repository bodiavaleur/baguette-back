import { UserDocument } from "~models/User/types";

declare global {
  namespace Express {
    interface Request {
      user: UserDocument | null;
    }
  }
}
