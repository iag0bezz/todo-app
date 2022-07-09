import { InMemoryTodosRepository } from "@modules/todo/repositories/in-memory/InMemoryTodosRepository";
import { ITodosRepository } from "@modules/todo/repositories/ITodosRepository";
import { ListTodoUseCase } from "./ListTodoUseCase";

let todosRepository: ITodosRepository;
let listTodoUseCase: ListTodoUseCase;

describe('List Todo UseCase', () => {
  beforeEach(() => {
    todosRepository = new InMemoryTodosRepository();
    listTodoUseCase = new ListTodoUseCase(
      todosRepository
    );
  });

  it('should be able to list user todos', async () => {
    await todosRepository.create({
      content: 'Test Content #1',
      completed: true,
      user_id: 'test-user-id',
    });

    await todosRepository.create({
      content: 'Test Content #2',
      completed: false,
      user_id: 'test-user-id',
    });

    const response = await listTodoUseCase.execute({
      user_id: 'test-user-id',
    });

    expect(response).toHaveLength(2);
  });
});