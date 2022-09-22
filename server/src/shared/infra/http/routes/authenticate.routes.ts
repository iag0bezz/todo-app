import { AuthenticateUserController } from '@modules/user/useCases/authenticateUser/AuthenticateUserController';
import { MeController } from '@modules/user/useCases/me/MeController';
import { RevalidateTokenController } from '@modules/user/useCases/revalidateToken/RevalidateTokenController';
import { AuthenticateUserValidator } from '@modules/user/validators/AuthenticateUserValidator';
import { RevalidateTokenValidator } from '@modules/user/validators/RevalidateTokenValidator';
import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureValidator } from '../middlewares/ensureValidator';

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const revalidateTokenController = new RevalidateTokenController();
const meController = new MeController();

authenticateRoutes.post(
  '/sessions',
  ensureValidator(AuthenticateUserValidator),
  authenticateUserController.handle,
);

authenticateRoutes.post(
  '/sessions/revalidate',
  ensureValidator(RevalidateTokenValidator),
  revalidateTokenController.handle,
);

authenticateRoutes.get(
  '/sessions/me',
  ensureAuthenticated,
  meController.handle,
);

export { authenticateRoutes };
