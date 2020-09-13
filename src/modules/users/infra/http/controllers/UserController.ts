import { Request, Response } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';
import HashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import ShowUserService from '@modules/users/services/ShowUserService';
import { classToClass } from 'class-transformer';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

class UserController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { email } = request.query;

    const usersRepository = new UsersRepository();
    const showUser = new ShowUserService(usersRepository);

    const user = await showUser.execute({ email });

    return response.json(classToClass(user));
  }

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
