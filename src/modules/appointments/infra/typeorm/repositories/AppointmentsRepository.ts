import { Repository, getRepository, Raw } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentRepository';
import IFindAllInMothFromProvider from '@modules/appointments/dtos/IFindAllInMothFromProvider';
import IFindAllInDayFromProvider from '@modules/appointments/dtos/IFindAllInDayFromProvider';
import { set } from 'date-fns';
import IFindaAllByDate from '@modules/appointments/dtos/IFindaAllByDate';

interface IRequest {
  user_id: string;
  provider_id: string;
  date: Date;
}

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment || undefined;
  }

  public async findAllByDate({
    provider_id,
    day,
    month,
    year,
  }: IFindaAllByDate): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');
    const parsedDay = String(day).padStart(2, '0');

    const findAppointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          (fieldName) => `to_char(${fieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
      },
    });

    return findAppointments;
  }

  public async create({
    user_id,
    provider_id,
    date,
  }: IRequest): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      user_id,
      provider_id,
      date,
    });

    await this.ormRepository.save(appointment);
    return appointment;
  }

  public async findAll(): Promise<Array<Appointment> | undefined> {
    const appointments = await this.ormRepository.find();

    return appointments;
  }

  public async findAllInMothFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMothFromProvider): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          (fieldName) => `to_char(${fieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
        ),
      },
    });

    return appointments;
  }

  public async findAllInDayFromProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindAllInDayFromProvider): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');
    const parsedDay = String(day).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          (fieldName) => `to_char(${fieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
      },
    });

    return appointments;
  }
}

export default AppointmentsRepository;
