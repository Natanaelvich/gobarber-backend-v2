import '@modules/users/providers/index';
import './providers';
import AppointmentsRepository from '@modules/Appointmensts/infra/typeorm/repositories/AppointmentsRepository';
import IAppointmentsRepository from '@modules/Appointmensts/repositories/IAppointmentsRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import { container } from 'tsyringe';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
