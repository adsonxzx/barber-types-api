import { Request, Response } from 'express';
import CreateSessionService from '@modules/users/services/CreateSessionService';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const usersRepository = new UsersRepository();

    const createSession = new CreateSessionService(usersRepository);

    const { user, token } = await createSession.execute({ email, password });

    delete user.password;

    return response.json({ user, token });
  }
}

export default new SessionController();
