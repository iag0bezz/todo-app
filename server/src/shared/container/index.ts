import { container } from 'tsyringe';

import { IUsersRepository } from '@modules/user/repositories/IUsersRepository';
import { PrismaUsersRepository } from '@modules/user/infra/prisma/PrismaUsersRepository';

import '@shared/container/providers';
import { ITodosRepository } from '@modules/todo/repositories/ITodosRepository';
import { PrismaTodosRepository } from '@modules/todo/infra/prisma/PrismaTodosRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', PrismaUsersRepository);

container.registerSingleton<ITodosRepository>('TodosRepository', PrismaTodosRepository);