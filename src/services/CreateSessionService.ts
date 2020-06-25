import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';

import User from '../models/User';
import AppError from '../error/AppError';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Email / Password is incorrect');
    }
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email / Password is incorrect');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = jwt.sign({ id: user.id }, secret, {
      expiresIn,
      subject: user.id,
    });

    return {
      user,
      token,
    };
  }
}

export default CreateSessionService;
