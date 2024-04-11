import { CreateTodoDTO } from '../../domain/dto';
import { TodoEntity } from '../../domain/entities';
import { UpdateTodoDTO } from '../../domain/dto/update-todo.dto';

export abstract class TodoService {
  abstract getAll(): Promise<TodoEntity[]>;
  abstract add(createTodoDTO: CreateTodoDTO): Promise<TodoEntity>;
  abstract getById(id: number): Promise<TodoEntity>;
  abstract update(updateTodoDTO: UpdateTodoDTO): Promise<TodoEntity>;
  abstract delete(id: number): Promise<TodoEntity>;
}