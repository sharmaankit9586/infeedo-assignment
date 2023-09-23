import { body } from 'express-validator';
import validateRequest from '../middlewares/validation.middleware';
import { TaskStatus } from '../entities/Task';

const taskValidator = body('title').trim().notEmpty()
  .withMessage('title is required')
  .bail()
  .isString()
  .withMessage('title should be a string');

const statusValidator = body('status').optional().trim().notEmpty()
  .withMessage('status is required')
  .bail()
  .isString()
  .withMessage('status should be a string')
  .bail()
  .isIn(Object.values(TaskStatus))
  .withMessage(`Invalid status, expected - ${Object.values(TaskStatus).join(', ')}`)
  ;

export const createTaskValidator = [
  taskValidator,
  ...validateRequest
];

export const updateTaskValidator = [
  taskValidator,
  statusValidator,
  ...validateRequest
];
