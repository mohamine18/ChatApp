import { ZodIssue } from 'zod';
import { ErrorRequestHandler, Request, Response } from 'express';
import AppError from '../utils/appError';

const validationError = (issues: ZodIssue[]) => {
  return new AppError('validation error', 400, issues);
};

const sendErrorDev = (err: AppError, req: Request, res: Response) => {
  res.status(err.statusCode).json({
    status: err.statusCode,
    error: {
      code: err.errorCode,
      message: err.message,
      details: err.details,
    },
  });
};

const sendErrorProd = (err: AppError, req: Request, res: Response) => {};

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err.name === 'ZodError') err = validationError(err.issues);
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
    return;
  }
  if (process.env.NODE_ENV === 'production') {
    sendErrorProd(err, req, res);
  }
};

export default globalErrorHandler;
