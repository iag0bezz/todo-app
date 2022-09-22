import { ITodosRepository } from '@modules/todo/repositories/ITodosRepository';
import { Todo } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { HttpError } from '@shared/errors/HttpError';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
export class DeleteTodoUseCase {
  constructor(
    @inject('TodosRepository')
    private todosRepository: ITodosRepository,
  ) {}

  async execute({ id, user_id }: IRequest): Promise<Todo> {
    let todo = await this.todosRepository.findById(id);

    if (!todo) {
      throw new HttpError('todo.todo-not-found', 404);
    }

    if (todo.user_id !== user_id) {
      throw new HttpError('todo.insufficient_permission', 403);
    }

    todo = await this.todosRepository.delete(todo.id);

    return todo;
  }
}
