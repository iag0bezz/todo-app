import '@shared/container/providers';

import { PrismaTodosRepository } from '@modules/todo/infra/prisma/PrismaTodosRepository';
import { ITodosRepository } from '@modules/todo/repositories/ITodosRepository';
import { PrismaSessionsRepository } from '@modules/user/infra/prisma/PrismaSessionsRepository';
import { PrismaUsersRepository } from '@modules/user/infra/prisma/PrismaUsersRepository';
import { ISessionsRepository } from '@modules/user/repositories/ISessionsRepository';
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

container.registerSingleton<ISessionsRepository>(
  'SessionsRepository',
  PrismaSessionsRepository,
);
