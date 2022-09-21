import { Todo } from '@prisma/client';

import { ICreateTodoDTO } from '../dtos/ICreateTodoDTO';

export interface ITodosRepository {
  create(data: ICreateTodoDTO): Promise<Todo>;
  delete(id: string): Promise<Todo>;
  findById(id: string): Promise<Todo>;
  findByUser(user_id: string): Promise<Todo[]>;
  updateCompleted(id: string, completed: boolean): Promise<Todo>;
}
