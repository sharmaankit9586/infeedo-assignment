import { Request, Response } from 'express';
import { createTask, getStats, getTasks, updateTask } from '../services/task.service';
import { PaginationQueryData } from '../types/request.type';

export const getAllTasks = async (req: Request<{}, {}, {}, PaginationQueryData>, res: Response) => {
  const { page, limit } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const take = parseInt(limit);
  const data = await getTasks(skip, take);
  res.json(data);
};

export const createATask = async (req: Request, res: Response) => {
  const { title } = req.body;
  const data = await createTask({ title });
  res.json(data);
};

export const updateATask = async (req: Request, res: Response) => {
  const { title, status } = req.body;
  const { id } = req.params;
  const data = await updateTask({ id: parseInt(id), title, status });
  res.json(data);
};

export const getTaskStats = async (req: Request, res: Response) => {
  const data = await getStats();
  res.json(data);
};
