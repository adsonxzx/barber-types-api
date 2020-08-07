import AppError from '@shared/error/AppError';
import { hash } from 'bcryptjs';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';

interface IRequest {
  token: string;
  newPassword: string;
}

class ResetUserPasswordService {
  private userRepository: IUsersRepository;

  private userTokenRepository: IUserTokenRepository;

  constructor(
    userRepository: IUsersRepository,
    userTokenRepository: IUserTokenRepository,
  ) {
    this.userRepository = userRepository;
    this.userTokenRepository = userTokenRepository;
  }

  public async execute({ token, newPassword }: IRequest) {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('token is invalid');
    }

    const user = await this.userRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('user does not exist');
    }

    const hashedPassword = await hash(newPassword, 8);

    user.password = hashedPassword;

    await this.userRepository.save(user);
  }
}

export default ResetUserPasswordService;
