import { ICreateUserDTO } from "@modules/user/dtos/ICreateUserDTO";
import { User } from "@prisma/client";
import { IUsersRepository } from "../IUsersRepository";
import { randomUUID } from 'node:crypto';

export class InMemoryUsersRepository implements IUsersRepository {
  private users: User[] = [];

  async create({ username, password }: ICreateUserDTO): Promise<User> {
    const user: User = {
      id: randomUUID(),
      username,
      password,
      created_at: new Date(),
    }

    this.users.push(user);

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find(data => data.id === id);

    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = this.users.find(data => data.username === username);

    return user;
  }
}