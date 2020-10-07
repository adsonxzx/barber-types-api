import { getHours, isBefore, isAfter } from 'date-fns';
import IAppointmentRepository from '../repositories/IAppointmentRepository';

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

interface IRequest {
  provider_id: string;
  day: number;
  year: number;
  month: number;
}

class ListProviderDayAvailabilityService {
  private appointmentRepository: IAppointmentRepository;

  constructor(appointmentRepository: IAppointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  public async execute({
    provider_id,
    day,
    year,
    month,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentRepository.findAllInDayFromProvider(
      {
        provider_id,
        day,
        month,
        year,
      },
    );

    const hourStart = 8;

    const hoursOfDay = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    );

    const availability = hoursOfDay.map((hour) => {
      const hasAppointmentInHour = appointments.find(
        (appointment) => getHours(appointment.date) === hour,
      );

      const currentDate = new Date(Date.now());
      const compareDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        available: !hasAppointmentInHour && isAfter(compareDate, currentDate),
      };
    });

    return availability;
  }
}

export default ListProviderDayAvailabilityService;
