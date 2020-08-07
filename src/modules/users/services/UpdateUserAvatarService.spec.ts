import FakeStorageUploadProvider from '@shared/container/providers/StorageUploadProvider/fakes/FakeStorageUploadProvider';
import AppError from '@shared/error/AppError';
import UpdateUserAvatarService from './UpdateUserAvatarService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';

describe('Update User Avatar', () => {
  it('should be able to update user avatar', async () => {
    const userRepository = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageUploadProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      userRepository,
      fakeStorageProvider,
    );

    const user = await userRepository.create({
      name: 'Adson',
      email: 'adsonxzx@gmail.com',
      password: '123456',
    });

    await updateUserAvatar.execute({ user_id: user.id, avatar: 'avatar.jpg' });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not to be able to update user avatar from non existing user', () => {
    const userRepository = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageUploadProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      userRepository,
      fakeStorageProvider,
    );

    expect(
      updateUserAvatar.execute({
        user_id: 'no-existing-user',
        avatar: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const userRepository = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageUploadProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatar = new UpdateUserAvatarService(
      userRepository,
      fakeStorageProvider,
    );

    const user = await userRepository.create({
      name: 'Adson',
      email: 'adsonxzx@gmail.com',
      password: '123456',
    });

    await updateUserAvatar.execute({ user_id: user.id, avatar: 'avatar.jpg' });

    await updateUserAvatar.execute({ user_id: user.id, avatar: 'avatar2.jpg' });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');

    expect(user.avatar).toBe('avatar2.jpg');
  });
});
