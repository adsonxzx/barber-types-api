import IAppointmentRepository from '../repositories/IAppointmentRepository';
import Appointmnet from '../infra/typeorm/entities/Appointment';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

class ListProviderDayAppointments {
  private appointmentRepository: IAppointmentRepository;

  constructor(appointmentRepository: IAppointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<Appointmnet[]> {
    const appointments = await this.appointmentRepository.findAllByDate({
      provider_id,
      day,
      month,
      year,
    });

    return appointments;
  }
}

export default ListProviderDayAppointments;
