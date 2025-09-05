export abstract class ValidationError extends Error {
  public readonly errorCode: string;

  constructor(props: {
    message: string;
  }) {
    super(props.message);
    this.name = this.constructor.name;
    this.errorCode = this.constructor.name;
  }
}
