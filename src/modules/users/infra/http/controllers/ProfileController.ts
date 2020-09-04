import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import UpdateUserProfileService from '@modules/users/services/UpdateUserProfileService';
import HashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

class ProfileController {
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const {
 name, email, old_password, password
} = request.body;

    const userRepository = new UsersRepository();
    const hashProvider = new HashProvider();
    const updateUserProfile = new UpdateUserProfileService(
      userRepository,
      hashProvider,
    );

    const updatedUser = await updateUserProfile.execute({
      user_id,
      name,
      email,
      old_password,
      password,
    });

    return response.json(classToClass(updatedUser));
  }
}

export default new ProfileController();
