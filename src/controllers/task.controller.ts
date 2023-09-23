import { Request, Response } from 'express';
import { createTask, getTasks } from '../services/task.service';

export const getAllTasks = async (req: Request, res: Response) => {
  const data = await getTasks();
  res.json(data);
};

export const createATask = async (req: Request, res: Response) => {
  const { title } = req.body;
  const data = await createTask({ title });
  res.json(data);
};

