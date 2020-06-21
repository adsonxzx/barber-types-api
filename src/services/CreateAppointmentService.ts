import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import Appointment from '../models/Appointment';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    const dateFormatted = startOfHour(date);

    const appointmentRepository = getCustomRepository(AppointmentsRepository);
    const findAppointmentInSameDate = await appointmentRepository.findByDate(
      dateFormatted,
    );

    if (findAppointmentInSameDate) {
      throw new Error('Agendamento ja existe');
    }

    const appointment = appointmentRepository.create({
      provider_id,
      date: dateFormatted,
    });

    await appointmentRepository.save(appointment);
    return appointment;
  }
}

export default CreateAppointmentService;
