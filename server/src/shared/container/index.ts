import '@shared/container/providers';

import { PrismaTodosRepository } from '@modules/todo/infra/prisma/PrismaTodosRepository';
import { ITodosRepository } from '@modules/todo/repositories/ITodosRepository';
import { PrismaUsersRepository } from '@modules/user/infra/prisma/PrismaUsersRepository';
import { IUsersRepository } from '@modules/user/repositories/IUsersRepository';
import { container } from 'tsyringe';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  PrismaUsersRepository,
);

container.registerSingleton<ITodosRepository>(
  'TodosRepository',
  PrismaTodosRepository,
);
