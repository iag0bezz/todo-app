import { Router } from "express";
import { authenticateRoutes } from "./authenticate.routes";
import { todosRoutes } from "./todos.routes";
import { userRoutes } from "./users.routes";

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/todos', todosRoutes);
routes.use(authenticateRoutes);

export { routes };