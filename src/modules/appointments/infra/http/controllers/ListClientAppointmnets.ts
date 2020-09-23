import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

class ListClientAppointments {
  public async index(request: Request, response: Response) {
    const { id } = request.user;
    const appointmentsRepository = new AppointmentsRepository();

    const clientAppointments = await appointmentsRepository.findAllNextFromClient(
      id,
    );
    return response.json(classToClass(clientAppointments));
  }
}

export default new ListClientAppointments();
