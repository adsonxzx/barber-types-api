import ICreateAppointment from '@modules/appointments/dtos/ICreateAppointment';
import Appointment from '../infra/typeorm/entities/Appointment';

export default interface IAppointmentRepository {
  create(data: ICreateAppointment): Promise<Appointment>;
  findByDate(data: Date): Promise<Appointment | undefined>;
  findAll(): Promise<Array<Appointment> | undefined>;
};
