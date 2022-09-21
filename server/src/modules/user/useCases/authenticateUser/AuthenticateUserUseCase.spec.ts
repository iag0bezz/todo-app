import { InMemoryUsersRepository } from "@modules/user/repositories/in-memory/InMemoryUsersRepository";
import { IUsersRepository } from "@modules/user/repositories/IUsersRepository";
import { HttpError } from "@shared/errors/HttpError";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepository: IUsersRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;

/*
  Password: password
*/
const HASHED_PASSWORD = "$2b$08$6MtI/rsoItDEPGwN7Vp.DeVELnOOMbSvVcbnKaK0wYiAUSG9r03b.";

describe('Authenticate User UseCase', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);
  });

  it('should be able to authenticate user', async () => {
    await usersRepository.create({
      username: 'Test Username',
      password: HASHED_PASSWORD,
    });

    const response = await authenticateUserUseCase.execute({
      username: 'Test Username',
      password: 'password',
    });

    expect(response).toHaveProperty('access_token');
    expect(response).toHaveProperty('refresh_token');
    expect(response.user).toHaveProperty('id');
    expect(response.user.username).toBe('Test Username');
  });

  it('should not be able to authenticate user with nonexistent username', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        username: 'Invalid Username',
        password: 'invalid-password',
      });
    }).rejects.toStrictEqual(
      new HttpError('authentication.invalid-credentials', 401)
    );
  });

  it('should not be able to authenticate user with invalid credentials', async () => {
    expect(async () => {
      await usersRepository.create({
        username: 'Test Username',
        password: HASHED_PASSWORD,
      });

      await authenticateUserUseCase.execute({
        username: 'Test Username',
        password: 'invalid-password',
      });
    }).rejects.toStrictEqual(
      new HttpError('authentication.invalid-credentials', 401)
    );
  });
});