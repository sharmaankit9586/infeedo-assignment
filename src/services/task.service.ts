import { getRepository } from 'typeorm';
import { Task } from '../entities/Task';
import { CreateTaskBody } from '../types/task.type';

export const getTasks = async () => {
  const taskRepository = getRepository(Task);
  return taskRepository.find({});
};

export const createTask = async (params: CreateTaskBody) => {
  const { title } = params;
  const taskRepository = getRepository(Task);
  const newTask = taskRepository.create({
    title
  });
  return taskRepository.save(newTask);
};
