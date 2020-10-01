import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvaillabilityService from './ListProviderMonthAvaillabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvaillabilityService: ListProviderMonthAvaillabilityService;

describe('ListProviderMonthAvaillabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvaillabilityService = new ListProviderMonthAvaillabilityService(
      fakeAppointmentsRepository,
    );
  });
  it('should be able to list the moth availability from provider', async () => {
    let promisesArray = [];
    for (let i = 8; i <= 17; i++) {
      promisesArray.push(
        fakeAppointmentsRepository.create({
          user_id: '123123',
          date: new Date(2020, 4, 20, i, 0, 0),
          provider_id: 'user',
        }),
      );
    }

    await Promise.all(promisesArray);

    promisesArray = [];
    for (let i = 8; i <= 17; i++) {
      promisesArray.push(
        fakeAppointmentsRepository.create({
          user_id: '123123',
          date: new Date(2020, 4, 8, i, 0, 0),
          provider_id: 'user',
        }),
      );
    }

    await Promise.all(promisesArray);

    await fakeAppointmentsRepository.create({
      user_id: '123123',
      date: new Date(2020, 4, 12, 8, 0, 0),
      provider_id: 'user',
    });
    await fakeAppointmentsRepository.create({
      user_id: '123123',
      date: new Date(2020, 4, 11, 8, 0, 0),
      provider_id: 'user',
    });

    const mothsProviderAvalibitys = await listProviderMonthAvaillabilityService.execute(
      {
        month: 5,
        provider_id: 'user',
        year: 2020,
      },
    );

    expect(mothsProviderAvalibitys).toEqual(
      expect.arrayContaining([
        { day: 8, available: false },
        { day: 11, available: true },
        { day: 12, available: true },
        { day: 20, available: false },
      ]),
    );
  });
});
