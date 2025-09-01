import crypto from 'node:crypto';

import type { ShortCodeVO } from '../value-objects/short-code.vo.ts';

export class ShortUrl {
  readonly uuid: string;
  readonly shortCode: ShortCodeVO;
  readonly destinationUrl: string;
  readonly generatedAt: Date;

  constructor(props: {
    shortCode: ShortCodeVO;
    destinationUrl: string;
    generatedAt: Date;
  }) {
    this.uuid = crypto.randomUUID();
    this.shortCode = props.shortCode;
    this.destinationUrl = props.destinationUrl;
    this.generatedAt = props.generatedAt;
  }
}
