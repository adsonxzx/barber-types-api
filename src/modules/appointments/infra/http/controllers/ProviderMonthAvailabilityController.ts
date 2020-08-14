import { Request, Response } from 'express';
import AppointmentsRepository from '../../typeorm/repositories/AppointmentsRepository';
import ListProviderMonthAvailabilityService from '../../../services/ListProviderMonthAvailabilityService';

class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.body;

    const appointmentRepository = new AppointmentsRepository();
    const listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      appointmentRepository,
    );

    const result = await listProviderMonthAvailability.execute({
      provider_id,
      month,
      year,
    });

    return response.json(result);
  }
}

export default new ProviderMonthAvailabilityController();
