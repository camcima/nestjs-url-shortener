import type { ShortCode } from '../value-objects/short-code.vo';

export class ShortUrl {
  readonly uuid: string;
  readonly shortCode: ShortCode;
  readonly destinationUrl: string;
  readonly generatedAt: Date;

  constructor(props: {
    uuid: string;
    shortCode: ShortCode;
    destinationUrl: string;
    generatedAt: Date;
  }) {
    this.uuid = props.uuid;
    this.shortCode = props.shortCode;
    this.destinationUrl = props.destinationUrl;
    this.generatedAt = props.generatedAt;
  }
}
