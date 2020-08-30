import { startOfDay } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appontment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentsService {
  public async execute({ provider_id, date }: Request): Promise<Appontment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfDay(date);

    const dateExists = await appointmentsRepository.findByDate(appointmentDate);

    if (dateExists) {
      throw Error('date already exists');
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentsService;
