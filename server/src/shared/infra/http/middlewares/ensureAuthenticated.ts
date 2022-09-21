import authConfig from '@config/auth';
import { IUsersRepository } from "@modules/user/repositories/IUsersRepository";
import { ITokenProvider } from "@shared/container/providers/TokenProvider/ITokenProvider";
import { HttpError } from "@shared/errors/HttpError";
import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";

export async function ensureAuthenticated(
  request: Request,
  _response: Response,
  next: NextFunction,
) {
  const auth_header = request.headers.authorization;

  if (!auth_header) {
    throw new HttpError('authorization.invalid-token-provided', 401);
  }

  const [, token] = auth_header.split(' ');

  const tokenProvider = container.resolve<ITokenProvider>('TokenProvider');

  try {
    const { sub: user_id } = await tokenProvider.verify(
      token,
      authConfig.access.secret,
    );

    const usersRepository = container.resolve<IUsersRepository>('UsersRepository');

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new HttpError('authorization.invalid-token', 409);
    }

    request.user = {
      id: user.id,
    }

    next();
  } catch {
    throw new HttpError('authorization.invalid-token', 409);
  }
}