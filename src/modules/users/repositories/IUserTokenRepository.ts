import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import ICreateToken from '@modules/users/dtos/ICreateToken';

export default interface IUserTokenRepository {
  findByToken(token: string): Promise<UserToken | undefined>;
  create(data: ICreateToken): Promise<UserToken>;
};
