import { TodoDatasource } from '../../application';
import { prisma } from '../../data';
import { CreateTodoDTO } from '../../domain/dto';
import { UpdateTodoDTO } from '../../domain/dto/update-todo.dto';
import { TodoEntity } from '../../domain/entities';

export class TodoDatasourceImpl implements TodoDatasource {

  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todos.findMany({ where: { active: true } });
    return todos.map(TodoEntity.fromObject);
  }

  async add(createTodoDTO: CreateTodoDTO): Promise<TodoEntity> {
    const todo = await prisma.todos.create({
      data: createTodoDTO!
    });

    return TodoEntity.fromObject(todo);
  }

  async getById(id: number): Promise<TodoEntity> {
    const todo = await prisma.todos.findFirst({ 
      where: { AND: { id, active: true } } 
    });

    if(!todo) {
      throw `Todo with id ${id} not found`;
    }

    return TodoEntity.fromObject(todo);
  }

  async update(updateTodoDTO: UpdateTodoDTO): Promise<TodoEntity> {
    await this.getById(updateTodoDTO.id);

    const updatedTodo = await prisma.todos.update({
      where: { id: updateTodoDTO.id },
      data: updateTodoDTO!.values
    });

    return TodoEntity.fromObject(updatedTodo);
  }

  async delete(id: number): Promise<TodoEntity> {
    await this.getById(id);

    const deletedTodo = await prisma.todos.update({
      where: { id },
      data: { active: false }
    });

    return TodoEntity.fromObject(deletedTodo);
  }
}