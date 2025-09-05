import { InvalidShortCodeError } from '../errors/invalid-short-code.error';

export class ShortCode {
  private constructor(public readonly value: string) {}

  toString(): string {
    return this.value;
  }

  static of(code: string): ShortCode {
    const allowedChars = /^[A-Za-z0-9\-_]{6}$/;
    if (!allowedChars.test(code)) {
      throw new InvalidShortCodeError(code);
    }

    return new ShortCode(code);
  }

  equals(other: ShortCode): boolean {
    return this.value === other.value;
  }
}
