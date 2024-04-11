import { Request, Response } from 'express';
import { CreateTodoDTO } from '../../domain/dto';
import { UpdateTodoDTO } from '../../domain/dto/update-todo.dto';
import { TodoRepository } from '../../application/repositories/todo.repository';

export class TodoController {
  constructor(
    private readonly todoRepository: TodoRepository,
  ) {}

  public getAll = async (req: Request, res: Response) => {
    const todos = await this.todoRepository.getAll();
    return res.status(200).json({ todos });
  }

  public add = async (req: Request, res: Response) => {
    const [error, createTodoDTO] = CreateTodoDTO.create(req.body);
    if(error) {
      return res.status(400).json({ error });
    }

    const todo = await this.todoRepository.add(createTodoDTO!);
    return res.status(201).json({ todo });
  }

  public getById = async (req: Request, res: Response) => {
    const id = +req.params.id;

    try {
      const todo = this.todoRepository.getById(id);
      return res.status(200).json({ todo });
    } catch(error) {
      return res.status(404).json({ message: 'Todo not found' });
    }
  }

  public update = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDTO] = UpdateTodoDTO.create({ ...req.body, id });

    if(error) {
      return res.status(400).json({ error });
    }

    try {
      const updatedTodo = await this.todoRepository.update(updateTodoDTO!);
      return res.status(200).json({ todo: updatedTodo });
    } catch(error) {
      return res.status(400).json({ error });
    }
  }

  public delete = async (req: Request, res: Response) => {
    const id = +req.params.id;

    try {
      const deletedTodo = await this.todoRepository.delete(id);
      return res.status(200).json({ todo: deletedTodo });
    } catch(error) {
      return res.status(400).json({ error });
    }
  }
}