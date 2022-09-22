import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteTodoUseCase } from './DeleteTodoUseCase';

export class DeleteTodoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;
    const { id: user_id } = request.user;

    const deleteTodoUseCase = container.resolve(DeleteTodoUseCase);

    const data = await deleteTodoUseCase.execute({
      id,
      user_id,
    });

    return response.status(200).json(data);
  }
}
