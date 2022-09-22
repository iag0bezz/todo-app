import { InMemorySessionsRepository } from '@modules/user/repositories/in-memory/InMemorySessionsRepository';
import { InMemoryUsersRepository } from '@modules/user/repositories/in-memory/InMemoryUsersRepository';
import { ISessionsRepository } from '@modules/user/repositories/ISessionsRepository';
import { IUsersRepository } from '@modules/user/repositories/IUsersRepository';
import { hash } from 'bcrypt';

import { HttpError } from '@shared/errors/HttpError';

import { RevalidateTokenUseCase } from './RevalidateTokenUseCase';

let usersRepository: IUsersRepository;
let sessionsRepository: ISessionsRepository;
let revalidateTokenUseCase: RevalidateTokenUseCase;

describe('Revalidate Token UseCase', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sessionsRepository = new InMemorySessionsRepository();
    revalidateTokenUseCase = new RevalidateTokenUseCase(
      usersRepository,
      sessionsRepository,
    );
  });

  it('should be able to revalidate user access token', async () => {
    const user = await usersRepository.create({
      username: 'Test Username',
      password: await hash('password', 8),
    });

    const session = await sessionsRepository.create('token_example', user.id);

    const response = await revalidateTokenUseCase.execute({
      token: session.token,
    });

    expect(response).toHaveProperty('access_token');
  });

  it('should not be able to revalidate user access token', async () => {
    expect(async () => {
      const user = await usersRepository.create({
        username: 'Test Username',
        password: await hash('password', 8),
      });

      const session = await sessionsRepository.create('token_example', user.id);

      await revalidateTokenUseCase.execute({
        token: session.token,
      });
    }).rejects.toStrictEqual(new HttpError('authentication.invalid-token'));
  });
});
