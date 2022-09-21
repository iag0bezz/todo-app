import { InMemoryTodosRepository } from '@modules/todo/repositories/in-memory/InMemoryTodosRepository';
import { ITodosRepository } from '@modules/todo/repositories/ITodosRepository';
import { InMemoryUsersRepository } from '@modules/user/repositories/in-memory/InMemoryUsersRepository';
import { IUsersRepository } from '@modules/user/repositories/IUsersRepository';

import { HttpError } from '@shared/errors/HttpError';

import { CreateTodoUseCase } from './CreateTodoUseCase';

let usersRepository: IUsersRepository;
let todosRepository: ITodosRepository;
let createTodoUseCase: CreateTodoUseCase;

describe('Create Todo UseCase', () => {
  beforeEach(() => {
    todosRepository = new InMemoryTodosRepository();
    usersRepository = new InMemoryUsersRepository();
    createTodoUseCase = new CreateTodoUseCase(todosRepository, usersRepository);
  });

  it('should be able to create todo', async () => {
    const user = await usersRepository.create({
      username: 'Test Username',
      password: 'test-password',
    });

    const todo = await createTodoUseCase.execute({
      content: 'Test Content',
      completed: true,
      user_id: user.id,
    });

    expect(todo).toHaveProperty('id');
    expect(todo.user_id).toBe(user.id);
    expect(todo.content).toBe('Test Content');
    expect(todo.completed).toBe(true);
  });

  it('should not be able to create todo with nonexistent user', async () => {
    expect(async () => {
      await createTodoUseCase.execute({
        content: 'Test Content',
        completed: true,
        user_id: 'invalid-user-id',
      });
    }).rejects.toStrictEqual(new HttpError('todo.user-not-found', 404));
  });
});
