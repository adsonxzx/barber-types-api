import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import authConfig from '@config/auth';
import AppError from '@shared/error/AppError';

interface ITokenPayload {
  sub: string;
  iat: number;
  exp: number;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authorizationHeader = request.headers.authorization;

  if (!authorizationHeader) {
    throw new AppError('JWT token is missing');
  }
  const [, token] = authorizationHeader.split(' ');

  const decoded = jwt.verify(token, authConfig.jwt.secret);

  const { sub } = decoded as ITokenPayload;
  request.user = {
    id: sub,
  };

  return next();
}
