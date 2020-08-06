import AppError from '@shared/error/AppError';
import CreateSessionService from './CreateSessionService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvidet';

describe('Create Session', () => {
  it('should be able to create a new session', async () => {
    const fakeUserReposiroty = new FakeUserRepository();
    const hashProvider = new FakeHashProvider();
    const createSession = new CreateSessionService(
      fakeUserReposiroty,
      hashProvider,
    );
    const createUser = new CreateUserService(fakeUserReposiroty, hashProvider);

    const password = '123456';
    const user = await createUser.execute({
      name: 'Adson',
      email: 'adsonxzx@gmail.com',
      password,
    });

    const session = await createSession.execute({
      email: user.email,
      password,
    });

    expect(session).toHaveProperty('token');
    expect(session.user).toEqual(user);
  });

  it('should not be able to create a new session with user that does not exist', () => {
    const fakeUserReposiroty = new FakeUserRepository();
    const hashProvider = new FakeHashProvider();
    const createSession = new CreateSessionService(
      fakeUserReposiroty,
      hashProvider,
    );

    expect(
      createSession.execute({
        email: 'user@notexist.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new session with wrong user password', async () => {
    const fakeUserReposiroty = new FakeUserRepository();
    const hashProvider = new FakeHashProvider();
    const createSession = new CreateSessionService(
      fakeUserReposiroty,
      hashProvider,
    );
    const createUser = new CreateUserService(fakeUserReposiroty, hashProvider);

    const user = await createUser.execute({
      name: 'Adson',
      email: 'adsonxzx@gmail.com',
      password: '123456',
    });

    expect(
      createSession.execute({
        email: user.email,
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
