import { getDate, getDaysInMonth } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface Request {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvaillabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
  }: Request): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInMothFromProvider(
      {
        provider_id,
        year,
        month,
      },
    );

    const numberOfDaysInMoth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from(
      { length: numberOfDaysInMoth },
      (_, index) => index + 1,
    );

    const availability = eachDayArray.map(day => {
      const appointmentInDay = appointments.filter(
        a => getDate(a.date) === day,
      );

      return {
        day,
        available: appointmentInDay.length < 10,
      };
    });

    return availability;
  }
}

export default ListProviderMonthAvaillabilityService;
