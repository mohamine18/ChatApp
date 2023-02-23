import mongoose, { Model, ObjectId } from 'mongoose';

type IMessage = {
  sender: ObjectId;
  recipient: ObjectId;
  text: string;
  status: string;
  timestamp: Date;
};

interface IMessageMethods {}

type MessageModel = Model<IMessage, {}, IMessageMethods>;

const messageSchema = new mongoose.Schema<
  IMessage,
  MessageModel,
  IMessageMethods
>({
  sender: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  recipient: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  status: { type: String, enum: ['read', 'unread'], default: 'unread' },
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
