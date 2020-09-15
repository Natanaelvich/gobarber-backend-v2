import AppError from '@shared/errors/AppError';
import { startOfDay } from 'date-fns';
import Appontment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentsService {
  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  public async execute({ provider_id, date }: Request): Promise<Appontment> {
    const appointmentDate = startOfDay(date);

    const dateExists = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (dateExists) {
      throw new AppError('date already exists');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentsService;
