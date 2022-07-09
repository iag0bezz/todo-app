export interface ICreateTodoDTO {
  content: string;
  completed: boolean;
  user_id?: string;
}