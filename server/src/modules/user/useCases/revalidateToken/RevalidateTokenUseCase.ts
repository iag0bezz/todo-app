import auth from '@config/auth';
import { ISessionsRepository } from '@modules/user/repositories/ISessionsRepository';
import { IUsersRepository } from '@modules/user/repositories/IUsersRepository';
import { container, inject, injectable } from 'tsyringe';

import { ITokenProvider } from '@shared/container/providers/TokenProvider/ITokenProvider';
import { HttpError } from '@shared/errors/HttpError';

interface IRequest {
  token: string;
}

interface IResponse {
  access_token: string;
}

@injectable()
export class RevalidateTokenUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('SessionsRepository')
    private sessionsRepository: ISessionsRepository,
  ) {}

  async execute({ token }: IRequest): Promise<IResponse> {
    const session = await this.sessionsRepository.findByToken(token);

    if (!session) {
      throw new HttpError('authentication.invalid-token', 401);
    }

    const tokenProvider = container.resolve<ITokenProvider>('TokenProvider');

    const { access, refresh } = auth;

    try {
      const { sub: user_id } = await tokenProvider.verify(
        token,
        refresh.secret,
      );

      const user = await this.usersRepository.findById(user_id);

      if (!user) {
        throw new HttpError('authentication.invalid-token', 401);
      }

      const access_token = await tokenProvider.sign(
        { id: user.id, username: user.username },
        user.id,
        access.secret,
        access.expires_in,
      );

      return {
        access_token,
      };
    } catch {
      throw new HttpError('authentication.invalid-token', 401);
    }
  }
}
