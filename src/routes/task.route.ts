import { Router } from 'express';
import {
  createTask, getTasks, getTaskStats, updateATask
} from '../controllers/task.controller';
import { createTaskValidator, updateTaskValidator } from '../validators/task.validator';

const router = Router();

router.get('/all', getTasks);
router.post('/create', createTaskValidator, createTask);
router.patch('/update/:id', updateTaskValidator, updateATask);
router.get('/stats', getTaskStats);

export default router;
