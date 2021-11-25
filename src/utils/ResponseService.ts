import type { Response } from "express";
import { HttpStatusCode } from "~config/errors";

class ResponseServiceBase {
  success(res: Response, data: any) {
    res.json(data);
  }

  error(res: Response, code: HttpStatusCode) {
    res.status(code).end();
  }

  errorMessage(res: Response, code: HttpStatusCode, message: string) {
    res.status(code).json({ error: message });
  }
}

const ResponseService = new ResponseServiceBase();

export default ResponseService;
