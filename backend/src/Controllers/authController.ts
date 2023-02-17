// Modules import
import { Request, Response } from 'express';
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongoose';

// Schemas import
import { signUpSchema, signUpType } from '../schemas/authSchema';

// Utils import
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import HTTP_CODES from '../utils/httpCodes';

const signToken = (userId: ObjectId | number) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (
  userId: number,
  statusCode: number,
  req: Request,
  res: Response
) => {
  // sign the token
  const token = signToken(userId);
  // send the token back to the user
  return res.status(statusCode).json({
    status: statusCode,
    statusCode: HTTP_CODES[statusCode],
    token,
  });
};

export const singUp: RequestHandler = catchAsync((req, res, next) => {
  const requestData: signUpType = req.body;
  // validate the body data
  const userData = signUpSchema.parse(requestData);
  // check if the user exist already in the database using the email

  // create the user in the database

  // send the welcome message

  // create the token and send it back to the user
  createSendToken(Math.random(), 201, req, res);
});
