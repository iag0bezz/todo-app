import { ICreateTodoDTO } from '@modules/todo/dtos/ICreateTodoDTO';
import { ITodosRepository } from '@modules/todo/repositories/ITodosRepository';
import { Todo } from '@prisma/client';

import { prisma } from '@shared/infra/database/prisma';

export class PrismaTodosRepository implements ITodosRepository {
  async create({
    content,
    completed = false,
    user_id,
  }: ICreateTodoDTO): Promise<Todo> {
    const todo = await prisma.todo.create({
      data: {
        content,
        completed,
        user_id,
      },
    });

    return todo;
  }

  async delete(id: string): Promise<Todo> {
    const todo = await prisma.todo.delete({
      where: {
        id,
      },
    });

    return todo;
  }

  async findById(id: string): Promise<Todo> {
    const todo = await prisma.todo.findFirst({
      where: {
        id,
      },
    });

    return todo;
  }

  async findByUser(user_id: string): Promise<Todo[]> {
    const todos = await prisma.todo.findMany({
      where: {
        user_id,
      },
    });

    return todos;
  }

  async updateCompleted(id: string, completed: boolean): Promise<Todo> {
    const todo = await prisma.todo.update({
      data: {
        completed,
      },
      where: {
        id,
      },
    });

    return todo;
  }
}
