import { Request, Response } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';
import HashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const usersRepository = new UsersRepository();
    const hahsProvider = new HashProvider();
    const createUser = new CreateUserService(usersRepository, hahsProvider);

    const user = await createUser.execute({ name, email, password });

    delete user.password;

    return response.json(user);
  }
}

export default new UserController();
