import { Request, Response } from 'express';

import SendEmailForgotPasswordService from '@modules/users/services/SendEmailForgotPasswordService';
import UserTokenRepository from '../../typeorm/repositories/UserTokenRepository';

class PasswordForgotController {
  public async create(request: Request, response: Response) {
    const { email } = request.body;
    const userTokenRepository = new UserTokenRepository();

    const sendEmailForgotPasswordService = new SendEmailForgotPasswordService(
      userTokenRepository,
    );

    await sendEmailForgotPasswordService.execute({ email });

    return response.status(203).send();
  }
}

export default new PasswordForgotController();
