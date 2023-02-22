//Modules import
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';

//Routes import
import authRouter from './routes/authRoutes';
import contactRouter from './routes/contactRoutes';
import messageRouter from './routes/messageRoutes';

// Utils imports
import AppError from './utils/appError';

//Controllers import
import globalErrorHandler from './Controllers/errorController';

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// cors options
const option = {
  origin: [
    'http://localhost:5173',
    'http://192.168.1.110:5173',
    'http://192.168.32.1:5173',
  ],
  optionsSuccessStatus: 200,
};

app.use('*', cors(option));

app.use(express.json({ limit: '10kb' }));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/contact', contactRouter);
app.use('/api/v1/conversation', messageRouter);
app.use('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

export default app;
