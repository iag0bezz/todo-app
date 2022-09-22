import { IUsersRepository } from '@modules/user/repositories/IUsersRepository';
import { Todo } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { HttpError } from '@shared/errors/HttpError';

interface IRequest {
  user_id: string;
}

interface IResponse {
  id: string;
  username: string;
  todos: Todo[];
}

@injectable()
export class MeUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ user_id }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new HttpError('authentication.invalid-credentials');
    }

    return {
      id: user.id,
      username: user.username,
      todos: user.todos,
    };
  }
}
