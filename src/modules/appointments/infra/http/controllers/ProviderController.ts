import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';

class ProviderController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const usersRepository = new UsersRepository();
    const listProviders = new ListProvidersService(usersRepository);

    const users = await listProviders.execute({ except_user_id: id });

    return response.json(classToClass(users));
  }
}

export default new ProviderController();
