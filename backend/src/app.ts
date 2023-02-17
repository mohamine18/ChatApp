//Modules import
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';

//Routes import
import authRouter from './routes/authRoutes';
import AppError from './utils/appError';

//Controllers import
import globalErrorHandler from './Controllers/errorController';

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json({ limit: '10kb' }));

app.use('/api/v1/auth', authRouter);
app.use('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

export default app;
