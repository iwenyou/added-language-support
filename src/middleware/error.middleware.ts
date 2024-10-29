import { Request, Response, NextFunction } from 'express';
import { QueryFailedError } from 'typeorm';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);

  if (error instanceof QueryFailedError) {
    return res.status(400).json({
      message: 'Database operation failed',
      error: error.message
    });
  }

  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
};