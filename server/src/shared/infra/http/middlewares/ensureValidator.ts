import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';

import { ValidationError } from '@shared/errors/ValidationError';

export function ensureValidator(schema: ObjectSchema<unknown>) {
  // eslint-disable-next-line func-names
  return async function (
    request: Request,
    _response: Response,
    next: NextFunction,
  ) {
    const { body = {}, params = {}, query = {} } = request;

    try {
      await schema.validateAsync(
        {
          body,
          params,
          query,
        },
        {
          abortEarly: false,
        },
      );

      next();
    } catch (exception) {
      const errors: string[] = [];

      exception.details.forEach((error: { message: string }) => {
        errors.push(error.message);
      });

      throw new ValidationError('params.invalid', errors);
    }
  };
}
