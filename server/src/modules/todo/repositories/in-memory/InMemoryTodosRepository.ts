import { ICreateTodoDTO } from '@modules/todo/dtos/ICreateTodoDTO';
import { Todo } from '@prisma/client';
import { randomUUID } from 'node:crypto';

import { ITodosRepository } from '../ITodosRepository';

export class InMemoryTodosRepository implements ITodosRepository {
  private todos: Todo[] = [];

  async create({ content, completed, user_id }: ICreateTodoDTO): Promise<Todo> {
    const todo: Todo = {
      id: randomUUID(),
      content,
      completed,
      user_id,
      created_at: new Date(),
    };

    this.todos.push(todo);

    return todo;
  }

  async delete(id: string): Promise<Todo> {
    const index = this.todos.findIndex(todo => todo.id === id);

    if (index === -1) {
      return undefined;
    }

    const todo = this.todos[index];

    this.todos.splice(index, 1);

    return todo;
  }

  async findById(id: string): Promise<Todo> {
    const todo = this.todos.find(todo => todo.id === id);

    return todo;
  }

  async findByUser(user_id: string): Promise<Todo[]> {
    const todos = this.todos.filter(todo => todo.user_id === user_id);

    return todos;
  }

  async updateCompleted(id: string, completed: boolean): Promise<Todo> {
    const index = this.todos.findIndex(todo => todo.id === id);

    if (index === -1) {
      return undefined;
    }

    const todo = { ...this.todos[index], completed };

    this.todos[index] = todo;

    return todo;
  }
}
