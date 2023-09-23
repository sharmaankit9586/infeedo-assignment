import { Router } from 'express';
import taskRouter from './task.route';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Hello World!!!',
  });
});
router.get('/health', (req, res) => {
  res.json({
    env: process.env.NODE_ENV
  });
});
router.use('/task', taskRouter);

export default router;
