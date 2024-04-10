import { Router } from 'express';
import { TodoRoutes } from './routes/todo.route';

export class AppRoutes {
    static get routes(): Router {
      const router = Router();
      router.use('/api/todos', TodoRoutes.routes);
  
      return router;
    }
  }