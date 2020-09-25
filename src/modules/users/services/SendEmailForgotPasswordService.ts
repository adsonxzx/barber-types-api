import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

import AppError from '@shared/error/AppError';

interface IRequest {
  email: string;
}

class SendEmailForgotPasswordService {
  private usersTokenRepository: IUserTokenRepository;

  private usersRepository: IUserRepository;

  private mailCliente: IMailProvider;

  constructor(
    userTokenRepository: IUserTokenRepository,
    usersRepository: IUserRepository,
    mailCliente: IMailProvider,
  ) {
    this.mailCliente = mailCliente;
    this.usersTokenRepository = userTokenRepository;
    this.usersRepository = usersRepository;
  }

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email does`t not exist!');
    }

    const { token } = await this.usersTokenRepository.create({
      user_id: user.id,
    });

    await this.mailCliente.sendMail(
      'adson@adson.com',
      `Para resetar sua senha acesse o link http://localhost:3000/token?${token} `,
    );
  }
}

export default SendEmailForgotPasswordService;
