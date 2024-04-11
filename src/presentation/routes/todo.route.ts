import { Router } from 'express';
import { TodoController } from '../controllers/todo.controller';
import { TodoDatasourceImpl } from '../../infrastructure/datasources/todo.datasource';
import { TodoRepositoryImpl } from '../../infrastructure/repositories/todo.repository';
import { TodoDatasource, TodoRepository } from '../../application';

export class TodoRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource: TodoDatasource = new TodoDatasourceImpl();
    const repository: TodoRepository = new TodoRepositoryImpl(datasource);
    const controller: TodoController = new TodoController(repository);

    router.get('/', controller.getAll);
    router.post('/', controller.add);
    router.get('/:id', controller.getById);
    router.put('/:id', controller.update);
    router.delete('/:id', controller.delete);

    return router;
  }
}