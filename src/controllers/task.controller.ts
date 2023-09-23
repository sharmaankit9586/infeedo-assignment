import { Request, Response } from 'express';
import {
  createTaskByTitle, getStatsGroupedMonthly, getTasksWithPagination, updateTaskById
} from '../services/task.service';
import { PaginationQueryData } from '../types/request.type';

export const getTasks = async (req: Request<{}, {}, {}, PaginationQueryData>, res: Response) => {
  const { page, limit } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const take = parseInt(limit);
  const data = await getTasksWithPagination(skip, take);
  res.json(data);
};

export const createTask = async (req: Request, res: Response) => {
  const { title } = req.body;
  const data = await createTaskByTitle({ title });
  res.json(data);
};

export const updateATask = async (req: Request, res: Response) => {
  const { title, status } = req.body;
  const { id } = req.params;
  const data = await updateTaskById({ id: parseInt(id), title, status });
  res.json(data);
};

export const getTaskStats = async (req: Request, res: Response) => {
  const data = await getStatsGroupedMonthly();
  res.json(data);
};
