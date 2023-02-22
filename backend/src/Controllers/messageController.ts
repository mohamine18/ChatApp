// module imports
import { RequestHandler, Response } from 'express';
import mongoose from 'mongoose';

// utils import
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';

// Schema import
import User from '../models/userModel';
import Message from '../models/messageModel';

// controllers import
import { IRequest } from './authController';
import HTTP_CODES from '../utils/httpCodes';

const sendJsonResponse = (
  res: Response,
  statusCode: number,
  data: any = null
) => {
  if (data) {
    return res.status(statusCode).json({
      status: statusCode,
      statusCode: HTTP_CODES[statusCode],
      data: data,
    });
  }
  return res.status(statusCode).json({
    status: statusCode,
    statusCode: HTTP_CODES[statusCode],
  });
};

export const getMessages: RequestHandler = catchAsync(
  async (req: IRequest, res, next) => {
    const userId = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(userId))
      return next(new AppError('Please provide a valid user id', 400));

    if (!userId) return next(new AppError('user not found', 4044));

    const conversation = await Message.find({
      recipient: userId,
      sender: req.user!._id,
    }).sort({ timestamp: -1 });

    sendJsonResponse(res, 200, conversation);
  }
);

export const addMessage: RequestHandler = catchAsync(
  async (req: IRequest, res, next) => {
    const { recipient, text } = req.body;

    if (!mongoose.Types.ObjectId.isValid(recipient))
      return next(new AppError('Please provide a valid user id', 400));

    const recipientUser = await User.findById(recipient).select(
      'firstName lastName email contacts'
    );

    if (!recipientUser) return next(new AppError('User not found', 404));

    if (
      !req.user?.contacts?.some(
        (contact) => String(contact.userId) === String(recipientUser._id)
      )
    )
      return next(new AppError('User does not exist in the contact list', 404));

    const newMessage = await Message.create({
      sender: req.user!._id,
      recipient: recipient,
      text: text,
    });

    sendJsonResponse(res, 201, newMessage);
  }
);
