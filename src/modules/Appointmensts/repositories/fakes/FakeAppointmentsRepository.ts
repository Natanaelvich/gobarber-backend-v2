import { v4 as uuidv4 } from 'uuid';

import ICreateAppointmentDTO from '@modules/Appointmensts/dtos/ICreateAppointmentDTO';
import IAppointmentsRepository from '@modules/Appointmensts/repositories/IAppointmentsRepository';
import { isEqual } from 'date-fns';
import Appointment from '@modules/Appointmensts/infra/typeorm/entities/Appointment';

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

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
