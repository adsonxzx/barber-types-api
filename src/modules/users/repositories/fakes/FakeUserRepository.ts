import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUser from '@modules/users/dtos/ICreateUser';
import User from '@modules/users/infra/typeorm/entities/User';
import { uuid } from 'uuidv4';

export default class UsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create({ email, name, password }: ICreateUser): Promise<User> {
    const user = new User();
    Object.assign(user, {
      id: uuid(),
      email,
      name,
      password,
    });
    this.users.push(user);

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find((user) => user.id === id);
    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find((user) => user.email === email);
    return findUser;
  }

  public async save(user: User): Promise<User> {
    const userIndex = this.users.findIndex(
      (findUser) => user.id === findUser.id,
    );

    this.users[userIndex] = user;
    return user;
  }
}
