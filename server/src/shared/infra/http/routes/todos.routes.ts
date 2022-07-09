import { CreateTodoController } from "@modules/todo/useCases/createTodo/CreateTodoController";
import { ListTodoController } from "@modules/todo/useCases/listTodo/ListTodoController";
import { CreateTodoValidator } from "@modules/todo/validators/CreateTodoValidator";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureValidator } from "../middlewares/ensureValidator";

const todosRoutes = Router();

const listTodoController = new ListTodoController();
const createTodoController = new CreateTodoController();

todosRoutes.get(
  '/',
  ensureAuthenticated,
  listTodoController.handle,
);

todosRoutes.post(
  '/',
  ensureAuthenticated,
  ensureValidator(CreateTodoValidator),
  createTodoController.handle,
);


export { todosRoutes };