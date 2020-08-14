import ICreateAppointment from '@modules/appointments/dtos/ICreateAppointment';
import Appointment from '../infra/typeorm/entities/Appointment';
import IFindAllInMothFromProvider from '../dtos/IFindAllInMothFromProvider';
import IFindAllInDayFromProvider from '../dtos/IFindAllInDayFromProvider';

export default interface IAppointmentRepository {
  create(data: ICreateAppointment): Promise<Appointment>;
  findByDate(data: Date): Promise<Appointment | undefined>;
  findAllInMothFromProvider(
    data: IFindAllInMothFromProvider,
  ): Promise<Appointment[]>;
  findAllInDayFromProvider(
    date: IFindAllInDayFromProvider,
  ): Promise<Appointment[]>;
  findAll(): Promise<Array<Appointment> | undefined>;
};
