import { Router } from 'express';
import {
  createATask, getAllTasks, getTaskStats, updateATask
} from '../controllers/task.controller';
import { createTaskValidator, updateTaskValidator } from '../validators/task.validator';

const router = Router();

router.get('/all', getAllTasks);
router.post('/create', createTaskValidator, createATask);
router.patch('/update/:id', updateTaskValidator, updateATask);
router.get('/stats', getTaskStats);

export default router;
