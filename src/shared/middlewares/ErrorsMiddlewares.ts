import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';

export default function ErrorsMiddlewares(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  if (error instanceof AppError)
    return response.status(error.statusCode).json({
      status: 'Error',
      statusCode: error.statusCode,
      message: error.message,
    });
  return response.status(500).json({
    status: 'Error',
    statusCode: 500,
    message: 'Internal server error',
  });
}
