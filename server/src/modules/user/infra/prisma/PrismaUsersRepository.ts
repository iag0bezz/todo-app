import { ICreateUserDTO } from '@modules/user/dtos/ICreateUserDTO';
import { IUsersRepository } from '@modules/user/repositories/IUsersRepository';
import { Todo, User } from '@prisma/client';

import { prisma } from '@shared/infra/database/prisma';

export class PrismaUsersRepository implements IUsersRepository {
  async create(data: ICreateUserDTO): Promise<User> {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  async findById(id: string): Promise<
    User & {
      todos: Todo[];
    }
  > {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
      include: {
        todos: true,
      },
    });

    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    return user;
  }
}
