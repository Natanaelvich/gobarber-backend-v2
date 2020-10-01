import { getHours } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface Request {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvaillabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
    day,
  }: Request): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDayromProvider(
      {
        provider_id,
        year,
        month,
        day,
      },
    );

    let hourStart = 8;

    const eachHourArray = Array.from({ length: 10 }, () => hourStart++);

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(
        a => getHours(a.date) === hour,
      );

      return {
        hour,
        available: !hasAppointmentInHour,
      };
    });

    return availability;
  }
}

export default ListProviderDayAvaillabilityService;
