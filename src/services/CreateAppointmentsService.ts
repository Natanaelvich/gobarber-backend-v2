import { startOfDay } from 'date-fns';
import Appontment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentsService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ provider, date }: Request): Appontment {
    const appointmentDate = startOfDay(date);

    const dateExists = this.appointmentsRepository.findByDate(appointmentDate);

    if (dateExists) {
      throw Error('date already exists');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentsService;
