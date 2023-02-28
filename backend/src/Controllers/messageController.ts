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
      $or: [
        { sender: req.user!._id, recipient: userId },
        { sender: userId, recipient: req.user!._id },
      ],
    }).sort({ timestamp: 1 });

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

export const getContactLastMessages: RequestHandler = catchAsync(
  async (req: IRequest, res, next) => {
    const { contactId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(contactId))
      return next(new AppError('please provide a valid user id', 400));

    const currentUserId = req.user!._id;

    const lastMessage = await Message.find({
      $or: [
        { sender: currentUserId, recipient: contactId },
        { sender: contactId, recipient: currentUserId },
      ],
    })
      .sort({ timestamp: -1 })
      .limit(1)
      .select('text timestamp');

    const unreadMessages = await Message.find({
      sender: contactId,
      recipient: currentUserId,
      status: 'unread',
    }).count();

    const info = {
      lastMessage: lastMessage[0]?.text || null,
      timestamp: lastMessage[0]?.timestamp || null,
      unreadMessages,
    };
    sendJsonResponse(res, 200, info);
  }
);

export const makeMessageRead: RequestHandler = catchAsync(
  async (req: IRequest, res, next) => {
    const { recipient } = req.body;
    const sender = req.user!._id;

    if (!mongoose.Types.ObjectId.isValid(recipient))
      return next(new AppError('please provide a valid user id', 400));

    const unreadMessage = await Message.updateMany(
      { sender: recipient, recipient: sender, status: 'unread' },
      { status: 'read' }
    );

    sendJsonResponse(res, 200);
  }
);
