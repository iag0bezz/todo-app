import authConfig from '@config/auth';
import { IAuthenticateUserDTO } from '@modules/user/dtos/IAuthenticateUserDTO';
import { ISessionsRepository } from '@modules/user/repositories/ISessionsRepository';
import { IUsersRepository } from '@modules/user/repositories/IUsersRepository';
import { container, inject, injectable } from 'tsyringe';

import { IHashProvider } from '@shared/container/providers/HashProvider/IHashProvider';
import { ITokenProvider } from '@shared/container/providers/TokenProvider/ITokenProvider';
import { HttpError } from '@shared/errors/HttpError';

type IRequest = IAuthenticateUserDTO;

interface IResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    username: string;
    created_at: Date;
  };
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('SessionsRepository')
    private sessionsRepository: ISessionsRepository,
  ) {}

  async execute({ username, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByUsername(username);

    if (!user) {
      throw new HttpError('authentication.invalid-credentials', 401);
    }

    const hashProvider = container.resolve<IHashProvider>('HashProvider');

    const passwordMatch = await hashProvider.compare(password, user.password);

    if (!passwordMatch) {
      throw new HttpError('authentication.invalid-credentials', 401);
    }

    const tokenProvider = container.resolve<ITokenProvider>('TokenProvider');

    const { access, refresh } = authConfig;

    const access_token = await tokenProvider.sign(
      { id: user.id, username: user.username },
      user.id,
      access.secret,
      access.expires_in,
    );

    const refresh_token = await tokenProvider.sign(
      { id: user.id },
      user.id,
      refresh.secret,
      refresh.expires_in,
    );

    await this.sessionsRepository.create(refresh_token, user.id);

    return {
      access_token,
      refresh_token,
      user: {
        id: user.id,
        username: user.username,
        created_at: user.created_at,
      },
    };
  }
}
