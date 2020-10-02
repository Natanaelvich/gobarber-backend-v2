import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmestsService from './ListProviderAppointmestsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointmestsService: ListProviderAppointmestsService;

describe('List ProviderAppointmests Service', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointmestsService = new ListProviderAppointmestsService(
      fakeAppointmentsRepository,
    );
  });
  it('should be able to list appointments for providers', async () => {
    const appointmetns1 = await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 11, 12, 0, 0),
      provider_id: 'user',
      user_id: '123123',
    });

    const appointmetns2 = await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 11, 13, 0, 0),
      provider_id: 'user',
      user_id: '123123',
    });

    const appointments = await listProviderAppointmestsService.execute({
      month: 5,
      provider_id: 'user',
      year: 2020,
      day: 11,
    });

    expect(appointments).toEqual([appointmetns1, appointmetns2]);
  });
});
