import { TodoDatasource, TodoRepository } from '../../application';
import { CreateTodoDTO } from '../../domain/dto';
import { UpdateTodoDTO } from '../../domain/dto/update-todo.dto';
import { TodoEntity } from '../../domain/entities';

export class TodoRepositoryImpl implements TodoRepository {

  constructor(
    private readonly todoDatasource: TodoDatasource,
  ) {}

  async getAll(): Promise<TodoEntity[]> {
    return await this.todoDatasource.getAll();
  }

  async add(createTodoDTO: CreateTodoDTO): Promise<TodoEntity> {
    return await this.todoDatasource.add(createTodoDTO);
  }

  async getById(id: number): Promise<TodoEntity> {
    return await this.todoDatasource.getById(id);
  }

  async update(updateTodoDTO: UpdateTodoDTO): Promise<TodoEntity> {
    return await this.todoDatasource.update(updateTodoDTO);
  }

  async delete(id: number): Promise<TodoEntity> {
    return await this.todoDatasource.delete(id);
  }
}