import { ICreateUserDTO } from "@modules/user/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/user/repositories/IUsersRepository";
import { User } from "@prisma/client";
import { IHashProvider } from "@shared/container/providers/HashProvider/IHashProvider";
import { HttpError } from "@shared/errors/HttpError";
import { container, inject, injectable } from "tsyringe";

type IRequest = ICreateUserDTO;

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ username, password }: IRequest): Promise<User> {
    const userExists = await this.usersRepository.findByUsername(username);

    if (userExists) {
      throw new HttpError('authentication.user-already-exists', 409);
    }

    const hashProvider = container.resolve<IHashProvider>('HashProvider');

    const passwordHash = await hashProvider.hash(password);

    const user = await this.usersRepository.create({
      username,
      password: passwordHash,
    });

    return user;
  }
}