import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ToggleTodoUseCase } from './ToggleTodoUseCase';

export class ToggleTodoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id, completed } = request.body;
    const { id: user_id } = request.user;

    console.log(id, completed);

    const toggleTodoUseCase = container.resolve(ToggleTodoUseCase);

    const data = await toggleTodoUseCase.execute({
      id,
      completed,
      user_id,
    });

    return response.status(200).json(data);
  }
}
