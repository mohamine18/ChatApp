// Modules imports
import { RequestHandler, Response } from 'express';
import mongoose from 'mongoose';

// Utils imports
import catchAsync from '../utils/catchAsync';

// Schemas imports
import User, { contactType } from '../models/userModel';
import Message from '../models/messageModel';

// Types import
import { IRequest } from './authController';

// Utils imports
import AppError from '../utils/appError';
import HTTP_CODES from '../utils/httpCodes';

type contactsList = {
  userId: string;
  fullName: string;
  email: string;
  _id: string;
  timestamp: Date;
};

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

export const searchContacts: RequestHandler = catchAsync(
  async (req: IRequest, res, next) => {
    const query = req.query.q;
    const contacts = await User.find({
      $and: [
        { _id: { $ne: req.user?._id } },
        { email: { $regex: `^${query}`, $options: 'i' } },
        { _id: { $nin: req.user?.contacts?.map((contact) => contact.userId) } },
      ],
    }).select('firstName lastName email');

    sendJsonResponse(res, 200, contacts);
  }
);

export const addContact: RequestHandler = catchAsync(
  async (req: IRequest, res, next) => {
    const contactId = req.body.contactId;

    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      return next(new AppError('Please provide a valid user id', 400));
    }

    const currentUser = await User.findById(req.user!._id);

    const exist = currentUser?.contacts?.some(
      (contact) => String(contact.userId) === String(contactId)
    );

    if (exist) {
      return next(new AppError('Contact already exist', 403));
    }

    const contactUser = await User.findById(contactId);

    if (!contactUser) {
      return next(new AppError('User not found', 404));
    }

    const newContact: contactType = {
      userId: contactUser._id,
      email: contactUser.email,
      fullName: `${contactUser?.firstName} ${contactUser?.lastName}`,
    };

    const mutualContact: contactType = {
      userId: currentUser!._id,
      email: currentUser!.email,
      fullName: `${currentUser?.firstName} ${currentUser?.lastName}`,
    };

    currentUser!.contacts?.push(newContact);
    contactUser.contacts?.push(mutualContact);
    await currentUser!.save();
    await contactUser.save();

    sendJsonResponse(res, 201);
  }
);

export const getContacts: RequestHandler = catchAsync(
  async (req: IRequest, res, next) => {
    const userId = req.user?._id;

    const contacts = User.findById(userId).select('contacts').cursor();
    let contactsListSorted: contactsList[] = [];
    for (
      let doc = await contacts.next();
      doc !== null;
      doc = await contacts.next()
    ) {
      if (doc.contacts != null) {
        for (let elem of doc.contacts) {
          const latestMessages = await Message.find({
            $or: [
              { sender: userId, recipient: elem.userId },
              { sender: elem.userId, recipient: userId },
            ],
          })
            .sort({ timestamp: -1 })
            .limit(1);
          let contact: contactsList = {
            userId: elem.userId.toString(),
            fullName: elem.fullName,
            email: elem.email,
            _id: elem._id!.toString(),
            timestamp: latestMessages[0]?.timestamp || new Date(-1),
          };
          contactsListSorted.push(contact);
        }
      }
    }
    contactsListSorted.sort((a, b) =>
      new Date(a.timestamp) < new Date(b.timestamp) ? 1 : -1
    );
    sendJsonResponse(res, 200, contactsListSorted);
  }
);
