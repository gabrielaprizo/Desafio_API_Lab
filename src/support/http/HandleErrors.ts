import { Request, Response, NextFunction } from 'express';
import { HttpException } from './HttpException';
import { HttpStatus } from './HttpStatus';

export const HandleErrors = (
  err: Error,
  request: Request,
  response: Response,
  _: NextFunction,
): Response => {
  console.log(err);
  let httpCode = HttpStatus.SERVER_ERROR;
  let message = 'An internal system error has occurred.';

  if (err instanceof HttpException) {
    httpCode = err.statusCode;
    message = err.message;
  }

  return response.status(httpCode).json({
    'message': message,
  });
};
