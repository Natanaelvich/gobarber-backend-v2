import INotificationRepository from '@modules/Notifications/repositories/INotificationRepository';
import AppError from '@shared/errors/AppError';
import { format, getHours, isBefore, startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import Appontment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface Request {
  provider_id: string;
  date: Date;
  user_id: string;
}

@injectable()
class CreateAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
    @inject('NotificationRepository')
    private notificationRepository: INotificationRepository,
  ) {}

  public async execute({
    provider_id,
    date,
    user_id,
  }: Request): Promise<Appontment> {
    console.log({ provider_id, date, user_id });
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't create an appointment on a past date");
    }

    if (user_id === provider_id) {
      throw new AppError("You can't create an appointment with youself");
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError('You only create an appointment between 8am and 5pm');
    }

    const dateExists = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (dateExists) {
      throw new AppError('date already exists');
    }

    console.log({ provider_id, date: appointmentDate, user_id });

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
      user_id,
    });

    const dateFormated = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'");

    await this.notificationRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para dia ${dateFormated}`,
    });

    return appointment;
  }
}

export default CreateAppointmentsService;
