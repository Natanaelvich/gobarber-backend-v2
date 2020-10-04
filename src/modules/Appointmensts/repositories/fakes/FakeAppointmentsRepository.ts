import { v4 as uuidv4 } from 'uuid';

import ICreateAppointmentDTO from '@modules/Appointmensts/dtos/ICreateAppointmentDTO';
import IAppointmentsRepository from '@modules/Appointmensts/repositories/IAppointmentsRepository';
import { getDate, getMonth, getYear, isEqual } from 'date-fns';
import Appointment from '@modules/Appointmensts/infra/typeorm/entities/Appointment';
import IFindAllInMothFromProviderDTO from '@modules/Appointmensts/dtos/IFindAllInMothFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/Appointmensts/dtos/IFindAllInDayFromProviderDTO';

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findAllInDayromProvider({
    provider_id,
    year,
    month,
    day,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const appointmentsFind = this.appointments.filter(
      a =>
        a.provider_id === provider_id &&
        getDate(a.date) === day &&
        getMonth(a.date) + 1 === month &&
        getYear(a.date) === year,
    );

    return appointmentsFind;
  }

  public async findAllInMothFromProvider({
    provider_id,
    year,
    month,
  }: IFindAllInMothFromProviderDTO): Promise<Appointment[]> {
    const appointmentsFind = this.appointments.filter(
      a =>
        a.provider_id === provider_id &&
        getMonth(a.date) + 1 === month &&
        getYear(a.date) === year,
    );

    return appointmentsFind;
  }

  public async findByDate(
    date: Date,
    provider_id: string,
  ): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      a => isEqual(a.date, date) && a.provider_id === provider_id,
    );

    return findAppointment;
  }

  public async create({
    provider_id,
    date,
    user_id,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    appointment.id = uuidv4();
    appointment.provider_id = provider_id;
    appointment.date = date;
    appointment.user_id = user_id;

    this.appointments.push(appointment);

    return appointment;
  }
}

export default FakeAppointmentsRepository;
