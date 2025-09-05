export abstract class DomainError extends Error {
  public readonly errorCode: string;

  constructor(props: {
    message: string;
  }) {
    super(props.message);
    this.errorCode = this.constructor.name;
    this.name = this.constructor.name;
  }
}
