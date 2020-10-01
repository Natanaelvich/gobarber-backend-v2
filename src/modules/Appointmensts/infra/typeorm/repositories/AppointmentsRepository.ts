import ICreateAppointmentDTO from '@modules/Appointmensts/dtos/ICreateAppointmentDTO';
import IFindAllInDayFromProviderDTO from '@modules/Appointmensts/dtos/IFindAllInDayFromProviderDTO';
import IFindAllInMothFromProviderDTO from '@modules/Appointmensts/dtos/IFindAllInMothFromProviderDTO';
import IAppointmentsRepository from '@modules/Appointmensts/repositories/IAppointmentsRepository';
import { startOfDay } from 'date-fns';
import { getRepository, Raw, Repository } from 'typeorm';
import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findAllInDayromProvider({
    provider_id,
    year,
    month,
    day,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');
    const parsedDay = String(day).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
      },
    });

    return appointments;
  }

  public async findAllInMothFromProvider({
    provider_id,
    year,
    month,
  }: IFindAllInMothFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
        ),
      },
    });

    return appointments;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointmentDate = startOfDay(date);

    const appointment = this.ormRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
