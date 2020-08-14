import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import { parseISO } from 'date-fns';
import { Request, Response } from 'express';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

class AppointmentController {
  public async index(equest: Request, response: Response) {
    const appointmentsRepository = new AppointmentsRepository();

    const appointments = await appointmentsRepository.findAll();

    return response.json(appointments);
  }

  public async create(request: Request, response: Response) {
    const { id } = request.user;
    const { provider_id, date } = request.body;
    const appointmentsRepository = new AppointmentsRepository();

    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService(
      appointmentsRepository,
    );

    const appointment = await createAppointmentService.execute({
      user_id: id,
      provider_id,
      date: parsedDate,
    });

    return response.json(appointment);
  }
}

export default new AppointmentController();
