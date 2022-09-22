import { Session } from '@prisma/client';

import { ISessionsRepository } from '../ISessionsRepository';

export class InMemorySessionsRepository implements ISessionsRepository {
  private tokens: Session[] = [];

  async create(token: string, user_id: string): Promise<Session> {
    const index = this.tokens.findIndex(data => data.user_id === user_id);

    let sessionToken: Session;

    if (index !== -1) {
      this.tokens[index].token = token;
      this.tokens[index].updated_at = new Date();

      sessionToken = this.tokens[index];
    } else {
      sessionToken = {
        token,
        user_id,
        created_at: new Date(),
        updated_at: new Date(),
      };

      this.tokens.push(sessionToken);
    }

    return sessionToken;
  }

  async findByToken(token: string): Promise<Session> {
    const sessionToken = this.tokens.find(data => data.token === token);

    return sessionToken;
  }
}
