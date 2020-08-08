import AppError from '@shared/error/AppError';
import UpdateUserProfileService from './UpdateUserProfileService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvidet';

describe('Update User Profile', () => {
  it('should be able to update user profile', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const updateUserProfile = new UpdateUserProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await fakeUserRepository.create({
      name: 'Adson Souza',
      email: 'adsonxzx@gmail.com',
      password: '123456',
    });

    const userUpdated = await updateUserProfile.execute({
      user_id: user.id,
      name: 'Adson Wesley',
      email: 'adson@adson.com',
    });

    expect(userUpdated.name).toBe('Adson Wesley');
    expect(userUpdated.email).toBe('adson@adson.com');
  });

  it('should not be able to update user email with another user email', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const updateUserProfile = new UpdateUserProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );

    await fakeUserRepository.create({
      name: 'Adson Souza',
      email: 'adsonxzx@gmail.com',
      password: '123456',
    });

    const user = await fakeUserRepository.create({
      name: 'Adson Souza',
      email: 'adson@gmail.com',
      password: '123456',
    });

    await expect(
      updateUserProfile.execute({
        user_id: user.id,
        name: 'Adson Wesley',
        email: 'adsonxzx@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const updateUserProfile = new UpdateUserProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await fakeUserRepository.create({
      name: 'Adson Souza',
      email: 'adson@gmail.com',
      password: '123456',
    });

    const updatedUser = await updateUserProfile.execute({
      user_id: user.id,
      name: 'Adson Souza',
      email: 'adson@gmail.com',
      password: '111111',
      old_password: '123456',
    });

    expect(updatedUser.password).toBe('111111');
  });

  it('should not be able to update the password without old passowrd', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const updateUserProfile = new UpdateUserProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await fakeUserRepository.create({
      name: 'Adson Souza',
      email: 'adson@gmail.com',
      password: '123456',
    });
    expect(
      updateUserProfile.execute({
        user_id: user.id,
        name: 'Adson Souza',
        email: 'adson@gmail.com',
        password: '111111',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old passowrd', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const updateUserProfile = new UpdateUserProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await fakeUserRepository.create({
      name: 'Adson Souza',
      email: 'adson@gmail.com',
      password: '123456',
    });

    expect(
      updateUserProfile.execute({
        user_id: user.id,
        name: 'Adson Souza',
        email: 'adson@gmail.com',
        password: '111111',
        old_password: '222222',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
