import { HttpError } from './HttpError';

export class ValidationError extends HttpError {
  public readonly errors: string[];

  constructor(message: string, errors: string[]) {
    super(message, 400);

    this.errors = errors;
  }
}
