import { ICreateUserDTO } from '@modules/user/dtos/ICreateUserDTO';
import { InMemoryUsersRepository } from '@modules/user/repositories/in-memory/InMemoryUsersRepository';
import { IUsersRepository } from '@modules/user/repositories/IUsersRepository';

import { HttpError } from '@shared/errors/HttpError';

import { CreateUserUseCase } from './CreateUserUseCase';

let usersRepository: IUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe('Register User UseCase', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  it('should be able to create user', async () => {
    const data: ICreateUserDTO = {
      username: 'Test Username',
      password: 'test-password',
    };

    const user = await createUserUseCase.execute(data);

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('created_at');
    expect(user.username).toBe('Test Username');
    expect(user.password).not.toBe('test-password');
  });

  it('should not be able to create user with existent username', async () => {
    expect(async () => {
      const username = 'Test Username';

      await usersRepository.create({
        username,
        password: 'test-password',
      });

      await createUserUseCase.execute({
        username,
        password: 'test-password',
      });
    }).rejects.toStrictEqual(
      new HttpError('authentication.user-already-exists', 409),
    );
  });
});
