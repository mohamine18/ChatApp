import mongoose, { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: string;
  passwordChangAt: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
}

interface iUserMethods {
  checkPassword(enteredPassword: string): Promise<boolean>;
  createPasswordRestToken(): string;
}

type UserModel = Model<IUser, {}, iUserMethods>;

const userSchema = new mongoose.Schema<IUser, UserModel, iUserMethods>(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
    },
    lastName: {
      type: String,
      require: [true, 'Last name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
    },
    avatar: String,
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
    passwordChangAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.method(
  'checkPassword',
  async function checkPassword(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  }
);

userSchema.method('createPasswordRestToken', function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 1000 * 60 * 60 * 24;
  return resetToken;
});

const User = mongoose.model<IUser, UserModel>('User', userSchema);

export default User;
