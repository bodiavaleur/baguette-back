import { UserDocument } from "~models/User/types";

declare global {
  namespace Express {
    interface User
      extends Pick<
        UserDocument,
        "email" | "password" | "username" | "dictionary"
      > {}
  }
}
