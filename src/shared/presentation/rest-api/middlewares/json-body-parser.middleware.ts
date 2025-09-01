import { Injectable, type NestMiddleware } from '@nestjs/common';
import bodyParser from 'body-parser';
import type { NextFunction, Request, Response } from 'express';

@Injectable()
export class JsonBodyParserMiddleware implements NestMiddleware {
  private readonly options: bodyParser.OptionsJson = {
    type: 'application/json',
    inflate: true,
    limit: '1mb',
    strict: true, // Only accepting arrays and objects
  };

  use(req: Request, res: Response, next: NextFunction) {
    return bodyParser.json(this.options)(req, res, next);
  }
}
