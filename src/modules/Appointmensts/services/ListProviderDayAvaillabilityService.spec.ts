import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvaillabilityService from './ListProviderDayAvaillabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvaillabilityService: ListProviderDayAvaillabilityService;

describe('ListProviderDayAvaillabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvaillabilityService = new ListProviderDayAvaillabilityService(
      fakeAppointmentsRepository,
    );
  });
  it('should be able to list the day availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 11, 8, 0, 0),
      provider_id: 'user',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 11, 12, 0, 0),
      provider_id: 'user',
    });

    const mothsProviderAvalibitys = await listProviderDayAvaillabilityService.execute(
      {
        month: 5,
        provider_id: 'user',
        year: 2020,
        day: 11,
      },
    );

    expect(mothsProviderAvalibitys).toEqual(
      expect.arrayContaining([
        {
          hour: 8,
          available: false,
        },
        {
          hour: 12,
          available: false,
        },
        {
          hour: 13,
          available: true,
        },
      ]),
    );
  });
});
