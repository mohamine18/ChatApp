// Modules import
import { RequestHandler, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// Schemas import
import {
  signUpSchema,
  logInSchema,
  signUpType,
  logInType,
  forgotPasswordSchema,
  forgotPasswordType,
  resetPasswordSchema,
  resetPasswordType,
} from '../schemas/authSchema';

// Models import
import User from '../models/userModel';

// Utils import
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import HTTP_CODES from '../utils/httpCodes';

const signToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (
  userId: string,
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

export const singUp: RequestHandler = catchAsync(async (req, res, next) => {
  const requestData: signUpType = req.body;

  // validate the body data
  const userData = signUpSchema.parse(requestData);

  // check if the user exist already in the database using the email
  const existUser = await User.findOne({ email: userData.email });
  if (existUser)
    return next(new AppError('User already exist please login', 403));

  // create the user in the database
  const newUser = await User.create({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    password: userData.password,
  });

  // create the token and send it back to the user
  const userId = newUser._id.toString();
  createSendToken(userId, 201, req, res);
});

export const logIn: RequestHandler = catchAsync(async (req, res, next) => {
  const requestData: logInType = req.body;

  // validate the body data
  const userData = logInSchema.parse(requestData);

  // check if the user exist and the password is correct
  const existUser = await User.findOne({ email: userData.email }).select(
    '+password'
  );
  if (!existUser)
    return next(new AppError('User do not exist please sing up', 403));
  const matchPassword = await existUser.checkPassword(userData.password);
  if (!matchPassword)
    return next(new AppError('Wrong password please retry', 403));

  // create the token and send it back to the user
  const userId = existUser._id.toString();
  createSendToken(userId, 200, req, res);
});

export const forgotPassword: RequestHandler = catchAsync(
  async (req, res, next) => {
    const requestData: forgotPasswordType = req.body;

    // Validate the body data
    const userData = forgotPasswordSchema.parse(requestData);

    //check if the user exist in the data base
    const existUser = await User.findOne({ email: userData.email });
    if (!existUser)
      return next(
        new AppError('There is no user with the provided email address', 404)
      );

    // Generate the random token
    const restToken = existUser.createPasswordRestToken();
    await existUser.save({ validateBeforeSave: false });

    // Send the rest token to the user in form of url (using email is the standard but in my case i will just return it as a normal string)
    const restURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/auth/reset-password/${restToken}`;

    res.status(200).json({
      status: 200,
      statusCode: HTTP_CODES[200],
      restURL,
    });
  }
);

export const resetPassword: RequestHandler = catchAsync(
  async (req, res, next) => {
    const token = req.params.resetToken;
    // check if the token included in the URL
    if (!token)
      return next(
        new AppError('Invalid reset password request. Please try again ', 404)
      );

    // validate the request body data
    const requestData: resetPasswordType = req.body;
    console.log(requestData);
    const userData = resetPasswordSchema.parse(requestData);

    // get the hash of the token
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // get the user from the database based on the hashed token
    const existUser = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    // Check if the user exist
    if (!existUser)
      return next(new AppError('Token is invalid or has expired', 400));

    // change the password
    existUser.password = userData.password;
    existUser.passwordResetExpires = new Date(0);
    existUser.passwordResetToken = '';
    existUser.passwordChangAt = new Date();
    await existUser.save();

    // send back the token
    const userId = existUser._id.toString();
    createSendToken(userId, 200, req, res);
  }
);
