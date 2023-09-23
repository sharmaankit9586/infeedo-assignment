import { body } from 'express-validator';
import validateRequest from '../middlewares/validation.middleware';

export const createTaskValidator = [
  body('title').trim().notEmpty()
    .withMessage('title is required')
    .bail()
    .isString()
    .withMessage('title should be a string'),
  ...validateRequest
];
