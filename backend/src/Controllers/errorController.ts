// modules import
import { ErrorRequestHandler, Request, Response } from 'express';
import { ZodIssue } from 'zod';
import mongoose from 'mongoose';

// Utils import
import AppError from '../utils/appError';

const validationError = (issues: ZodIssue[]) => {
  return new AppError('validation error', 400, issues);
};

const ODMValidationError = () => {
  return new AppError('ODM validation error', 400);
};

const duplicateFieldDB = () => {
  return new AppError('Duplicate field. Please use another value', 4000);
};

const handleCastErrorDB = () => {
  return new AppError('Cast error. please try another value', 400);
};
const tokenError = () => {
  return new AppError(
    'invalid signature please provide a valid JWT token',
    400
  );
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
  console.log(err);
  if (err.name === 'JsonWebTokenError') err = tokenError();
  if (err.name === 'ZodError') err = validationError(err.issues);
  if (err instanceof mongoose.Error.ValidationError) err = ODMValidationError();
  if (err.code === 11000) err = duplicateFieldDB();
  if (err.name === 'CastError') err = handleCastErrorDB();
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
    return;
  }
  if (process.env.NODE_ENV === 'production') {
    sendErrorProd(err, req, res);
  }
};

export default globalErrorHandler;
