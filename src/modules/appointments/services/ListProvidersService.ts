import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';

class ListProvidersService {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  public async execute(): Promise<User[]> {
    const users = await this.usersRepository.findAllProviders();

    return users;
  }
}

export default ListProvidersService;
