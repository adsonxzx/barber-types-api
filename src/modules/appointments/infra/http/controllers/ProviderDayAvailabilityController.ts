import { Request, Response } from 'express';
import AppointmentsRepository from '../../typeorm/repositories/AppointmentsRepository';
import ListProviderDayAvailabilityService from '../../../services/ListProviderDayAvailabilityService';

class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { day, month, year } = request.body;

    const appointmentRepository = new AppointmentsRepository();
    const listProviderMonthAvailability = new ListProviderDayAvailabilityService(
      appointmentRepository,
    );

    const result = await listProviderMonthAvailability.execute({
      provider_id,
      day,
      month,
      year,
    });

    return response.json(result);
  }
}

export default new ProviderDayAvailabilityController();
