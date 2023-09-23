import { Router } from 'express';
import { createATask, getAllTasks } from '../controllers/task.controller';
import { createTaskValidator } from '../validators/task.validator';

const router = Router();

router.get('/all', getAllTasks);
router.post('/create', createTaskValidator, createATask);

export default router;
