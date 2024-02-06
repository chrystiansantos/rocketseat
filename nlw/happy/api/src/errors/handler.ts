import {
  Errback,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';
import { ValidationError } from 'yup';

interface IValidationErrors {
  [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (
  error: Errback,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (error instanceof ValidationError) {
    const errors: IValidationErrors = {};
    error.inner.forEach(err => {
      errors[err.path] = err.errors;
    });
    return response.status(400).json({ message: 'Validation fails', errors });
  }
  console.error(error);
  return response.status(500).json({ message: 'Internal server error' });
};

export default errorHandler;
