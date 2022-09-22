import { Session } from '@prisma/client';

export interface ISessionsRepository {
  findByToken(token: string): Promise<Session>;
  create(token: string, user_id: string): Promise<Session>;
}
