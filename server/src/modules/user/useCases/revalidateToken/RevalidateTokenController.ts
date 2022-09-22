import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RevalidateTokenUseCase } from './RevalidateTokenUseCase';

export class RevalidateTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.body;

    const revalidateTokenUseCase = container.resolve(RevalidateTokenUseCase);

    const data = await revalidateTokenUseCase.execute({
      token,
    });

    return response.status(200).json(data);
  }
}
