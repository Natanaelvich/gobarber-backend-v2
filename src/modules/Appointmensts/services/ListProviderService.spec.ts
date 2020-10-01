import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import ListProviderService from './ListProviderService';

let fakeUserRepository: FakeUserRepository;
let listProviders: ListProviderService;

describe('List Providers', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    listProviders = new ListProviderService(fakeUserRepository);
  });
  it('should be able to list providers', async () => {
    const user1 = await fakeUserRepository.create({
      email: 'user1@gmail.com',
      name: 'user1',
      password: '123123',
    });
    await fakeUserRepository.create({
      email: 'user2@gmail.com',
      name: 'user2',
      password: '123123',
    });
    await fakeUserRepository.create({
      email: 'user3@gmail.com',
      name: 'user3',
      password: '123123',
    });

    const providers = await listProviders.execute({ user_id: user1.id });

    expect(providers).not.toContain(user1);
  });
});
