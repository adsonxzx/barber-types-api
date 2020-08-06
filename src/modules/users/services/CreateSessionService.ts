import jwt from 'jsonwebtoken';
import authConfig from '@config/auth';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/error/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionService {
  private usersRepository: IUsersRepository;

  private hashProvider: IHashProvider;

  constructor(usersRepository: IUsersRepository, hashProvider: IHashProvider) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
  }

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email / Password is incorrect');
    }
    const passwordMatch = await this.hashProvider.compareHash(
      password,
      user.password,
    );

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
