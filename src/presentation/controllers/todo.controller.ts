import { Request, Response } from 'express';

const todos = [
  { id: 1, description: 'Task1', isCompleted: false, createdAt: new Date() },
  { id: 2, description: 'Task2', isCompleted: false, createdAt: new Date() },
  { id: 3, description: 'Task3', isCompleted: false, createdAt: new Date() },
];

export class TodoController {
  constructor() {}

  getAll(req: Request, res: Response) {
    return res.status(200).json({ todos });
  }

  add(req: Request, res: Response) {
    const { description } = req.body;

    const newTodo = {
      id: new Date().getTime(),
      description,
      isCompleted: false,
      createdAt: new Date(),
    }

    todos.push(newTodo);
    return res.status(201).json({ todo: newTodo });
  }

  getById(req: Request, res: Response) {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === Number(id));

    if(!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    return res.status(200).json({ todo });
  }

  update(req: Request, res: Response) {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === Number(id));

    if(!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    const { description } = req.body;
    todo.description = description;
    todo.isCompleted = true;

    return res.status(200).json({ todo });
  }

  delete(req: Request, res: Response) {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === Number(id));

    if(todoIndex === -1) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    todos.splice(todoIndex, 1);

    return res.status(200).json({ message: 'Todo eliminado' });
  }
}