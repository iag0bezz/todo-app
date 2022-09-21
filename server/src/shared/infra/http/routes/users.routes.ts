import { CreateUserController } from "@modules/user/useCases/createUser/CreateUserController";
import { CreateUserValidator } from "@modules/user/validators/CreateUserValidator";
import { Router } from "express";
import { ensureValidator } from "../middlewares/ensureValidator";

const userRoutes = Router();

const createUserController = new CreateUserController();

userRoutes.post(
  '/',
  ensureValidator(CreateUserValidator),
  createUserController.handle,
);

export { userRoutes };