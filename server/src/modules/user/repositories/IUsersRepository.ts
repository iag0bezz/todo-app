import { Todo, User } from '@prisma/client';

import { ICreateUserDTO } from '../dtos/ICreateUserDTO';

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findById(id: string): Promise<
    User & {
      todos: Todo[];
    }
  >;
  findByUsername(username: string): Promise<User>;
}
