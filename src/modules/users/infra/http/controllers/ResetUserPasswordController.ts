import { Response, Request } from 'express';

import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UserTokenRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository';
import ResetUserPasswordService from '@modules/users/services/ResetUserPasswordService';

class ResetUserPasswrodController {
  public async create(request: Request, response: Response) {
    const { token, newPassword } = request.body;

    const userRepository = new UserRepository();
    const userTokenRepository = new UserTokenRepository();
    const resetUserPasswordService = new ResetUserPasswordService(
      userRepository,
      userTokenRepository,
    );

    await resetUserPasswordService.execute({ token, newPassword });

    return response.status(203).send();
  }
}

export default new ResetUserPasswrodController();
