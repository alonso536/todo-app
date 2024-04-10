import { Request, Response } from 'express';
import { prisma } from '../../data';
import { CreateTodoDTO } from '../../domain/dto';
import { UpdateTodoDTO } from '../../domain/dto/update-todo.dto';

export class TodoController {
  constructor() {}

  async getAll(req: Request, res: Response) {
    const todos = await prisma.todos.findMany();
    return res.status(200).json({ todos });
  }

  async add(req: Request, res: Response) {
    const [error, createTodoDTO] = CreateTodoDTO.create(req.body);

    if(error) {
      return res.status(400).json({ error });
    }
    const todo = await prisma.todos.create({
      data: createTodoDTO!
    });

    return res.status(201).json({ todo });
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const todo = await prisma.todos.findFirst({ 
      where: { AND: { id: Number(id), active: true } },
    });

    if(!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    return res.status(200).json({ todo });
  }

  async update(req: Request, res: Response) {
    const id = +req.params.id;
    const [error, updateTodoDTO] = UpdateTodoDTO.create({ ...req.body, id });

    if(error) {
      return res.status(400).json({ error });
    }

    const todo = await prisma.todos.update({
      where: { id },
      data: updateTodoDTO!.values
    });

    return res.status(200).json({ todo });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await prisma.todos.update({
      where: { id: Number(id) },
      data: { active: false }
    });

    return res.status(200).json({ message: 'Todo eliminado' });
  }
}