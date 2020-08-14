import { startOfHour, isBefore, set, getHours } from 'date-fns';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/error/AppError';
import ICreateAppointment from '@modules/appointments/dtos/ICreateAppointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentRepository';

class CreateAppointmentService {
  private appointmentRepository: IAppointmentsRepository;

  constructor(appointmentRepository: IAppointmentsRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  public async execute({
    user_id,
    provider_id,
    date,
  }: ICreateAppointment): Promise<Appointment> {
    const dateFormatted = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentRepository.findByDate(
      dateFormatted,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('Agendamento ja existe');
    }

    const currentDate = startOfHour(new Date());

    const isDatePassed = isBefore(dateFormatted, currentDate);

    if (isDatePassed) {
      throw new AppError(
        'It is not allowed to create appointment on past dates',
      );
    }

    const hourOfDate = getHours(dateFormatted);

    const isWithinInterval = hourOfDate >= 8 && hourOfDate <= 17;

    if (!isWithinInterval) {
      throw new AppError('it is only allowed to create from 8:00 to 17:00');
    }

    if (provider_id === user_id) {
      throw new AppError('it is not allowed to create for youself');
    }

    const appointment = await this.appointmentRepository.create({
      user_id,
      provider_id,
      date: dateFormatted,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
