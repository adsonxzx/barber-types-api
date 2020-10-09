import { getDaysInMonth, getDate, isWithinInterval } from 'date-fns';
import IAppointmentRepository from '../repositories/IAppointmentRepository';

interface IRequest {
  provider_id: string;
  year: number;
  month: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
  hasAppointment: boolean;
}>;

class ListProviderMonthAvailabilityService {
  private appointmentRepository: IAppointmentRepository;

  constructor(appointmentRepository: IAppointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  public async execute({
    provider_id,
    year,
    month,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentRepository.findAllInMothFromProvider(
      {
        provider_id,
        month,
        year,
      },
    );

    const daysOfMonth = getDaysInMonth(new Date(year, month - 1));

    const monthAvailable = Array.from(
      { length: daysOfMonth },
      (_, index) => index + 1,
    );

    const availability = monthAvailable.map((day) => {
      const appointmentsInDay = appointments.filter(
        (appointment) => getDate(appointment.date) === day,
      );

      const today = new Date();
      const currentDate = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        today.getDate(),
        0,
        0,
        0,
      );
      const appointmentDate = new Date(year, month, day, 0, 0, 0);

      let isFutureDate = false;

      if (month >= today.getMonth() + 1) {
        isFutureDate = isWithinInterval(appointmentDate, {
          start: currentDate,
          end: new Date(year, month, daysOfMonth, 0, 0, 0),
        });
      }

      return {
        day,
        isPast: !isFutureDate,
        available: appointmentsInDay.length < 10,
        hasAppointment: appointmentsInDay.length >= 1,
      };
    });

    return availability;
  }
}

export default ListProviderMonthAvailabilityService;
