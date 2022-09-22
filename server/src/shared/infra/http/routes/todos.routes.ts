import { CreateTodoController } from '@modules/todo/useCases/createTodo/CreateTodoController';
import { DeleteTodoController } from '@modules/todo/useCases/deleteTodo/DeleteTodoController';
import { ListTodoController } from '@modules/todo/useCases/listTodo/ListTodoController';
import { ToggleTodoController } from '@modules/todo/useCases/toggleTodo/ToggleTodoController';
import { CreateTodoValidator } from '@modules/todo/validators/CreateTodoValidator';
import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureValidator } from '../middlewares/ensureValidator';

const todosRoutes = Router();

const listTodoController = new ListTodoController();
const createTodoController = new CreateTodoController();
const toggleTodoController = new ToggleTodoController();
const deleteTodoController = new DeleteTodoController();

todosRoutes.get('/', ensureAuthenticated, listTodoController.handle);

todosRoutes.post(
  '/',
  ensureAuthenticated,
  ensureValidator(CreateTodoValidator),
  createTodoController.handle,
);

todosRoutes.put('/', ensureAuthenticated, toggleTodoController.handle);

todosRoutes.delete('/', ensureAuthenticated, deleteTodoController.handle);

export { todosRoutes };
