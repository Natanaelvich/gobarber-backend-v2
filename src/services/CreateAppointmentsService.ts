import { startOfDay } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appontment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentsService {
  public async execute({ provider, date }: Request): Promise<Appontment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfDay(date);

    const dateExists = await appointmentsRepository.findByDate(appointmentDate);

    if (dateExists) {
      throw Error('date already exists');
    }

    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentsService;
