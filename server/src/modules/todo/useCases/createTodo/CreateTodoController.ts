import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateTodoUseCase } from './CreateTodoUseCase';

export class CreateTodoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { content, completed = false } = request.body;
    const { id } = request.user;

    const createTodoUseCase = container.resolve(CreateTodoUseCase);

    const todo = await createTodoUseCase.execute({
      content,
      completed,
      user_id: id,
    });

    return response.status(201).json(todo);
  }
}
