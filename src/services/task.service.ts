import { getRepository } from 'typeorm';
import { Task, TaskStatus } from '../entities/Task';
import { CreateTaskBody, GetStatsFilter, UpdateTaskBody } from '../types/task.type';
import { BadRequestError } from '../errors/bad-request.error';

export const getTasks = async (skip: number, take: number) => {
  const taskRepository = getRepository(Task);
  const [tasks, total] = await taskRepository.findAndCount({
    skip, take, order: {
      createdAt: 'DESC'
    }
  });
  return {
    tasks,
    total
  }
};

export const createTask = async (params: CreateTaskBody) => {
  const { title } = params;
  const taskRepository = getRepository(Task);
  const newTask = taskRepository.create({
    title
  });
  return taskRepository.save(newTask);
};

export const updateTask = async (params: UpdateTaskBody) => {
  const { id, title, status } = params;
  const taskRepository = getRepository(Task);
  const task = await taskRepository.findOne({
    where: {
      id
    }
  });
  if (!task) throw new BadRequestError('Task not found');
  task.title = title;
  if (status) {
    task.status = status;
  }
  await taskRepository.save(task);
  return task;
};

export const getStats = async () => {
  const taskRepository = getRepository(Task);

  const results = await taskRepository
    .createQueryBuilder('task')
    .select("TO_CHAR(task.createdAt, 'Month YYYY') AS date")
    .addSelect('SUM(CASE WHEN task.status = :open THEN 1 ELSE 0 END) AS open_tasks')
    .addSelect('SUM(CASE WHEN task.status = :inProgress THEN 1 ELSE 0 END) AS inprogress_tasks')
    .addSelect('SUM(CASE WHEN task.status = :completed THEN 1 ELSE 0 END) AS completed_tasks')
    .setParameter('open', TaskStatus.OPEN)
    .setParameter('inProgress', TaskStatus.IN_PROGRESS)
    .setParameter('completed', TaskStatus.COMPLETED)
    .groupBy('date')
    .getRawMany();

  const resultWithMonthNames = results.map((result) => ({
    date: result.date,
    metrics: {
      open_tasks: parseInt(result.open_tasks),
      inprogress_tasks: parseInt(result.inprogress_tasks),
      completed_tasks: parseInt(result.completed_tasks),
    },
  }))

  return resultWithMonthNames
};
