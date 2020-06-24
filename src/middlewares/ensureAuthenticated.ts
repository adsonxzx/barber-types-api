import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import authConfig from '../config/auth';

interface TokenPayload {
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
    throw new Error('JWT token is missing');
  }
  const [, token] = authorizationHeader.split(' ');

  try {
    const decoded = jwt.verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;
    request.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw new Error('Invalid JWT token');
  }
}
