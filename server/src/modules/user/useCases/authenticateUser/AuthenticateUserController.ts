import { IAuthenticateUserDTO } from "@modules/user/dtos/IAuthenticateUserDTO";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password }: IAuthenticateUserDTO = request.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const data = await authenticateUserUseCase.execute({
      username,
      password
    });

    return response.json(data);
  }
}