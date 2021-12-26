import type { Response as ResponseType } from "express";
import { HttpStatus } from "~config/errors";

class ResponseBase {
  success(res: ResponseType, data: any) {
    res.json(data);
  }

  error(res: ResponseType, code: HttpStatus) {
    res.status(code).end();
  }

  errorMessage(res: ResponseType, code: HttpStatus, message: string) {
    res.status(code).json({ error: message });
  }
}

const Response = new ResponseBase();

export default Response;
