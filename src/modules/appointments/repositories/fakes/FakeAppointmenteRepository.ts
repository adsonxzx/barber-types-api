import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentRepository';
import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

interface IRequest {
  provider_id: string;
  date: Date;
}

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find((appointment) =>
      isEqual(appointment.date, date),
    );

    return findAppointment;
  }

  public async create({ provider_id, date }: IRequest): Promise<Appointment> {
    const appointment = new Appointment();
    Object.assign(appointment, { id: uuid(), date, provider_id });

    return appointment;
  }

  public async findAll(): Promise<Array<Appointment> | undefined> {
    return this.appointments;
  }
}

export default AppointmentsRepository;
