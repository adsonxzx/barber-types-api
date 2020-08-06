import AppError from '@shared/error/AppError';
import bcrypt from 'bcryptjs';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import CreateUserService from './CreateUserService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvidet';

describe('Create User', () => {
  it('should be able to create a new user', async () => {
    const fakeUserReposiroty = new FakeUserRepository();
    const hashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(fakeUserReposiroty, hashProvider);

    const user = await createUser.execute({
      name: 'Adson',
      email: 'adsonxzx@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUserReposiroty = new FakeUserRepository();
    const hashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(fakeUserReposiroty, hashProvider);

    await createUser.execute({
      name: 'Adson',
      email: 'adsonxzx@gmail.com',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'Jack',
        email: 'adsonxzx@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to hash password when create a new user', async () => {
    const userRepository = new UserRepository();
    const hashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(userRepository, hashProvider);

    const password = '123456';
    const user = await createUser.execute({
      name: 'Adson',
      email: 'adsonxzx@gmail.com',
      password,
    });

    const match = await bcrypt.compare(password, user.password);

    expect(match).toEqual(true);
  });
});
