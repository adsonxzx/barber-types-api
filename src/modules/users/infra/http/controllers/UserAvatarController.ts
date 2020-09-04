import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import DiskStorageProvider from '@shared/container/providers/StorageUploadProvider/implementations/DiskStorageProvider';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UsersRepository();
    const diskStorageProvider = new DiskStorageProvider();
    const updateAvatar = new UpdateUserAvatarService(
      usersRepository,
      diskStorageProvider,
    );

    const user = await updateAvatar.execute({
      user_id: request.user.id,
      avatar: request.file.filename,
    });

    return response.json(classToClass(user));
  }
}

export default new UserAvatarController();
