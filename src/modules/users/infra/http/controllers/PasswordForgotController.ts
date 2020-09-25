import { Request, Response } from 'express';

import SendEmailForgotPasswordService from '@modules/users/services/SendEmailForgotPasswordService';
import MailProvider from '@shared/container/providers/MailProvider/implementations/MailProvider';
import UserTokenRepository from '../../typeorm/repositories/UserTokenRepository';
import UserRepository from '../../typeorm/repositories/UsersRepository';

class PasswordForgotController {
  public async create(request: Request, response: Response) {
    const { email } = request.body;
    const userTokenRepository = new UserTokenRepository();
    const userRepository = new UserRepository();
    const mailProvider = new MailProvider();

    const sendEmailForgotPasswordService = new SendEmailForgotPasswordService(
      userTokenRepository,
      userRepository,
      mailProvider,
    );

    await sendEmailForgotPasswordService.execute({ email });

    return response.status(203).send();
  }
}

export default new PasswordForgotController();
