import { startOfHour } from 'date-fns';
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

    const appointment = await this.appointmentRepository.create({
      provider_id,
      date: dateFormatted,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
