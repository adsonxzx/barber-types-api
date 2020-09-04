import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import CreateSessionService from '@modules/users/services/CreateSessionService';
import HashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const usersRepository = new UsersRepository();
    const hashPassowrd = new HashProvider();
    const createSession = new CreateSessionService(
      usersRepository,
      hashPassowrd,
    );

    const { user, token } = await createSession.execute({ email, password });

    return response.json({ user: classToClass(user), token });
  }
}

export default new SessionController();
