import { ZodIssue } from 'zod';
import HTTP_CODES from './httpCodes';
type newZodIssue = {
  path: (string | number)[];
  message: string;
}[];
class AppError extends Error {
  errorCode: string = '';
  statusCode: number = 0;
  status: string = '';
  operational: boolean = true;
  details: newZodIssue = [];
  constructor(
    message: string,
    statusCode: number,
    issues: ZodIssue[] | null = null
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = HTTP_CODES[statusCode];
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.operational = true;
    if (issues) {
      const newIssues: newZodIssue = issues.map((issue) => {
        return { path: issue.path, message: issue.message };
      });
      this.details = newIssues;
    }
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
