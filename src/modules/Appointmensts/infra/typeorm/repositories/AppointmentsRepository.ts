import ICreateAppointmentDTO from '@modules/Appointmensts/dtos/ICreateAppointmentDTO';
import IAppointmentsRepository from '@modules/Appointmensts/repositories/IAppointmentsRepository';
import { startOfDay } from 'date-fns';
import { getRepository, Repository } from 'typeorm';
import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
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
