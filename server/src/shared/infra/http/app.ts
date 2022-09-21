/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from 'express';

import { HttpError } from '@shared/errors/HttpError';

import 'express-async-errors';
import 'reflect-metadata';

import '@shared/container';

import { routes } from './routes';

const app = express();

app.use(express.json());

app.use('/api/v1', routes);

app.use(
  (
    error: Error,
    _request: Request,
    response: Response,
    _next: NextFunction,
  ) => {
    if (error instanceof HttpError) {
      return response.status(error.statusCode).json({
        ...error,
        timestamp: new Date(),
      });
    }

    return response.status(500).json({
      message: 'internal-error',
      statusCode: 500,
      timestamp: new Date(),
      error,
    });
  },
);

export { app };
