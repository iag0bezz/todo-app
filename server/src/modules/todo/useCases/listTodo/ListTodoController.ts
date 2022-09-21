import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListTodoUseCase } from "./ListTodoUseCase";

export class ListTodoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listTodoUseCase = container.resolve(ListTodoUseCase);

    const todos = await listTodoUseCase.execute({
      user_id: id,
    });

    return response.json(todos);
  }
}