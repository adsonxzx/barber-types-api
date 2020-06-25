import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import User from '../models/User';
import upload from '../config/upload';

interface Request {
  user_id: string;
  avatar: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatar }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { id: user_id } });

    if (!user) {
      throw new Error('User does not exist');
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
    userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
