import path from 'path';
import fs from 'fs';

import User from '@modules/users/infra/typeorm/entities/User';
import upload from '@config/upload';
import AppError from '@shared/error/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  avatar: string;
}

class UpdateUserAvatarService {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  public async execute({ user_id, avatar }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(
        upload.folderDestination,
        user.avatar,
      );
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatar;
    delete user.password;
    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
