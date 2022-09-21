import { AuthenticateUserController } from "@modules/user/useCases/authenticateUser/AuthenticateUserController";
import { AuthenticateUserValidator } from "@modules/user/validators/AuthenticateUserValidator";
import { Router } from "express";
import { ensureValidator } from "../middlewares/ensureValidator";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authenticateRoutes.post(
  '/sessions',
  ensureValidator(AuthenticateUserValidator),
  authenticateUserController.handle,
);

export { authenticateRoutes };