import { ITodosRepository } from '@modules/todo/repositories/ITodosRepository';
import { Todo } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

type IRequest = {
  user_id: string;
};

type IResponse = Todo[];

@injectable()
export class ListTodoUseCase {
  constructor(
    @inject('TodosRepository')
    private todosRepository: ITodosRepository,
  ) {}

  async execute({ user_id }: IRequest): Promise<IResponse> {
    const todos = await this.todosRepository.findByUser(user_id);

    return todos;
  }
}
