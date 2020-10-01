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
      date: new Date(2020, 4, 11, 14, 0, 0),
      provider_id: 'user',
      user_id: '123123',
    });

    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 11, 12, 0, 0).getTime();
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
          hour: 9,
          available: false,
        },
        {
          hour: 10,
          available: false,
        },
        {
          hour: 11,
          available: false,
        },
        {
          hour: 13,
          available: true,
        },
        {
          hour: 14,
          available: false,
        },
        {
          hour: 15,
          available: true,
        },
        {
          hour: 16,
          available: true,
        },
        {
          hour: 17,
          available: true,
        },
      ]),
    );
  });
});
