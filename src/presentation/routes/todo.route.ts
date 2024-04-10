import { Router } from 'express';
import { TodoController } from '../controllers/todo.controller';

export class TodoRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new TodoController();

    router.get('/', controller.getAll);
    router.post('/', controller.add);
    router.get('/:id', controller.getById);
    router.put('/:id', controller.update);
    router.delete('/:id', controller.delete);

    return router;
  }
}