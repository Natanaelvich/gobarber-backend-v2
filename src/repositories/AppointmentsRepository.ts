import { isEqual } from 'date-fns';
import Appontment from '../models/Appointment';

interface CreatedAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appontment[];

  constructor() {
    this.appointments = [];
  }

  public all(): Appontment[] {
    return this.appointments;
  }

  public findByDate(date: Date): boolean {
    const findDateEqual = !!this.appointments.find(a => isEqual(date, a.date));

    return findDateEqual;
  }

  public create({ date, provider }: CreatedAppointmentDTO): Appontment {
    const appointment = new Appontment({ provider, date });

    this.appointments.push(appointment);
    return appointment;
  }
}

export default AppointmentsRepository;
