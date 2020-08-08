import User from '../infra/typeorm/entities/User';
import ICreateUser from '../dtos/ICreateUser';
import IFindAllProviders from '../dtos/IFindAllProviders';

export default interface IUsersRepository {
  findAllProviders(data: IFindAllProviders): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  create(data: ICreateUser): Promise<User>;
  save(user: User): Promise<User>;
}
