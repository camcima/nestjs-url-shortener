export abstract class ValidationError extends Error {
  constructor(props: {
    message: string;
  }) {
    super(props.message);
  }
}
