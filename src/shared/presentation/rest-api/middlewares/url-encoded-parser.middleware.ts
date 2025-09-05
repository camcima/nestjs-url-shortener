import { type NestMiddleware } from '@nestjs/common';
import bodyParser from 'body-parser';
import type { NextFunction, Request, Response } from 'express';

export class UrlEncodedParserMiddleware implements NestMiddleware {
  private readonly options: bodyParser.OptionsUrlencoded = {
    extended: true,
  };

  use(req: Request, res: Response, next: NextFunction) {
    return bodyParser.urlencoded(this.options)(req, res, next);
  }
}
