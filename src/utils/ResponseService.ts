import type { Response } from "express";
import { HttpStatus } from "~config/errors";

class ResponseServiceBase {
  success(res: Response, data: any) {
    res.json(data);
  }

  error(res: Response, code: HttpStatus) {
    res.status(code).end();
  }

  errorMessage(res: Response, code: HttpStatus, message: string) {
    res.status(code).json({ error: message });
  }
}

const ResponseService = new ResponseServiceBase();

export default ResponseService;
