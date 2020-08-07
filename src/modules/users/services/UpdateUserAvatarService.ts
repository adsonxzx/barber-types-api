import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/error/AppError';
import IStorageUploadProvider from '@shared/container/providers/StorageUploadProvider/models/IStorageUploadProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  avatar: string;
}

class UpdateUserAvatarService {
  private usersRepository: IUsersRepository;

  private storageProvider: IStorageUploadProvider;

  constructor(
    usersRepository: IUsersRepository,
    storageProvider: IStorageUploadProvider,
  ) {
    this.usersRepository = usersRepository;
    this.storageProvider = storageProvider;
  }

  public async execute({ user_id, avatar }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist');
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatar);

    user.avatar = filename;
    delete user.password;
    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
