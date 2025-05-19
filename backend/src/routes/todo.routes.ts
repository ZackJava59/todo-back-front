import {Router} from 'express';
import * as todoController from '../controllers/todos.controller.js';

const router = Router();

router.get('/', todoController.getAllTodosController);
router.post('/', todoController.createTodoController);
router.get('/:id', todoController.getTodoByIdController);
router.put('/:id', todoController.updateTodoController);
router.delete('/:id', todoController.deleteTodoController);
router.delete('/', todoController.deleteAllTodosController);

export default router