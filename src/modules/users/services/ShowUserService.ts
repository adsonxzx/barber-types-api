import AppError from '@shared/error/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
}

class ShowUserService {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  public async execute({ email }: IRequest) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not founded', 404);
    }

    return user;
  }
}

export default ShowUserService;
