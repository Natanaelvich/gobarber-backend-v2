import '@modules/users/providers/index';
import './providers';
import AppointmentsRepository from '@modules/Appointmensts/infra/typeorm/repositories/AppointmentsRepository';
import IAppointmentsRepository from '@modules/Appointmensts/repositories/IAppointmentsRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import { container } from 'tsyringe';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import UserTokenRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository';
import INotificationRepository from '@modules/Notifications/repositories/INotificationRepository';
import NotificationRepository from '@modules/Notifications/infra/typeorm/repositories/NotificationRepository';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);
container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IUserTokenRepository>(
  'UserTokenRepository',
  UserTokenRepository,
);
container.registerSingleton<INotificationRepository>(
  'NotificationRepository',
  NotificationRepository,
);
