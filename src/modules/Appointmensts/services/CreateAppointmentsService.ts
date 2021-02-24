import INotificationRepository from '@modules/Notifications/repositories/INotificationRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { format, getHours, isBefore, startOfHour } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
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
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    date,
    user_id,
  }: Request): Promise<Appontment> {
    const appointmentDate = startOfHour(date);
    const etst = utcToZonedTime(date, 'America/Sao_Paulo');
    console.log(appointmentDate);
    console.log(date);
    console.log(etst);

    if (isBefore(date, Date.now())) {
      throw new AppError("You can't create an appointment on a past date");
    }

    if (user_id === provider_id) {
      throw new AppError("You can't create an appointment with youself");
    }

    if (getHours(date) < 8 || getHours(date) > 17) {
      throw new AppError('You only create an appointment between 8am and 5pm');
    }

    const dateExists = await this.appointmentsRepository.findByDate(
      date,
      provider_id,
    );

    if (dateExists) {
      throw new AppError('date already exists');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date,
      user_id,
    });

    const dateFormated = format(date, "dd/MM/yyyy 'às' HH:mm'h'");

    await this.notificationRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para dia ${dateFormated}`,
    });
    await this.cacheProvider.invalidate(
      `provider_appointments:${provider_id}:${format(
        appointmentDate,
        'yyyy-M-d',
      )}`,
    );

    return appointment;
  }
}

export default CreateAppointmentsService;
