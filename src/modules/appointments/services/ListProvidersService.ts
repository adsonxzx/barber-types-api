import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IFindAllProviders from '@modules/users/dtos/IFindAllProviders';
import User from '@modules/users/infra/typeorm/entities/User';

class ListProvidersService {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  public async execute({ except_user_id }: IFindAllProviders): Promise<User[]> {
    const users = await this.usersRepository.findAllProviders({
      except_user_id,
    });

    return users;
  }
}

export default ListProvidersService;
