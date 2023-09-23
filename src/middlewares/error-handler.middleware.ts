import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors/custom.error';
import { ResponseType } from '../types/response.type';

export const errorHandler = (err: Error, req: Request, res: ResponseType, next: NextFunction): Response<any> => {
  if (err instanceof CustomError) {
    const errors = err.serializeErrors();
    return res.status(err.statusCode).send({
      errors,
      statusCode: err.statusCode,
      success: false,
      message: errors[0].message
    });
  }
  console.error(err);
  const statusCode = 500;
  const message = 'Something went wrong!';
  return res.status(statusCode).json({
    statusCode,
    message,
    errors: [
      {
        message
      }
    ],
    success: false
  });
};
