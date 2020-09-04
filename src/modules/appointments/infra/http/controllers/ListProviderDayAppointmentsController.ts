import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import AppointmentsRepository from '../../typeorm/repositories/AppointmentsRepository';

class ListProviderDayAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { day, month, year } = request.query;
    const appointmentRepository = new AppointmentsRepository();

    const appointments = await appointmentRepository.findAllByDate({
      provider_id: id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(classToClass(appointments));
  }
}

export default new ListProviderDayAppointmentsController();
