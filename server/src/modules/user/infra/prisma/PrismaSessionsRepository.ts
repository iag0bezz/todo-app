import { ISessionsRepository } from '@modules/user/repositories/ISessionsRepository';
import { Session } from '@prisma/client';

import { prisma } from '@shared/infra/database/prisma';

export class PrismaSessionsRepository implements ISessionsRepository {
  async findByToken(token: string): Promise<Session> {
    const session = await prisma.session.findFirst({
      where: {
        token,
      },
    });

    return session;
  }

  async create(token: string, user_id: string): Promise<Session> {
    const session = await prisma.session.upsert({
      where: {
        user_id,
      },
      create: {
        user_id,
        token,
      },
      update: {
        token,
      },
    });

    return session;
  }
}
