import * as crypto from 'node:crypto';

import { Injectable } from '@nestjs/common';

import { ShortCode } from '../../../short-url/domain/value-objects/short-code.vo';

@Injectable()
export class UrlShortCodeGeneratorService {
  private getSecureRandomInt(max: number): number {
    const randomBytes = crypto.randomBytes(4).readUInt32BE(0);
    return randomBytes % max;
  }

  generate(): ShortCode {
    const alphabet =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

    const codeLength = 6;

    let code = '';
    const alphabetLength = alphabet.length;

    for (let i = 0; i < codeLength; i++) {
      const randomIndex = this.getSecureRandomInt(alphabetLength);
      code += alphabet[randomIndex];
    }

    return ShortCode.of(code);
  }
}
