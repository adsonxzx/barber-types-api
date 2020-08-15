import { Request, Response } from 'express';
import AppointmentsRepository from '../../typeorm/repositories/AppointmentsRepository';

class ListProviderDayAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const {
 provider_id, day, month, year
} = request.body;

    const appointmentRepository = new AppointmentsRepository();

    const appointments = await appointmentRepository.findAllByDate({
      provider_id,
      day,
      month,
      year,
    });

    return response.json(appointments);
  }
}

export default new ListProviderDayAppointmentsController();
