import { ICreateTodoDTO } from "@modules/todo/dtos/ICreateTodoDTO";
import { ITodosRepository } from "@modules/todo/repositories/ITodosRepository";
import { IUsersRepository } from "@modules/user/repositories/IUsersRepository";
import { HttpError } from "@shared/errors/HttpError";
import { inject, injectable } from "tsyringe";

type IRequest = ICreateTodoDTO;

@injectable()
export class CreateTodoUseCase {
  constructor(
    @inject('TodosRepository')
    private todosRepository: ITodosRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ content, completed, user_id }: IRequest) {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new HttpError('todo.user-not-found', 404);
    }

    const todo = await this.todosRepository.create({
      content,
      completed,
      user_id: user.id,
    });

    return todo;
  }
}