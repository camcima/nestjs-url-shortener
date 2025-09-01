import { InvalidShortCodeError } from '../errors/invalid-short-code.error.ts';

export class ShortCodeVO {
  private constructor(public readonly value: string) {}

  toString(): string {
    return this.value;
  }

  static of(code: string): ShortCodeVO {
    const allowedChars = /^[A-Za-z0-9\-_]{6}$/;
    if (!allowedChars.test(code)) {
      throw new InvalidShortCodeError(code);
    }

    return new ShortCodeVO(code);
  }

  equals(other: ShortCodeVO): boolean {
    return this.value === other.value;
  }
}
