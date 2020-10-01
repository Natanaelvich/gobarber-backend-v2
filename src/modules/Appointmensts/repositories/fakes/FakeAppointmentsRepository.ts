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

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(a => isEqual(a.date, date));

    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    appointment.id = uuidv4();
    appointment.provider_id = provider_id;
    appointment.date = date;

    this.appointments.push(appointment);

    return appointment;
  }
}

export default FakeAppointmentsRepository;
