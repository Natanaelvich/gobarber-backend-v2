import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import AppError from '@shared/errors/AppError';
import ShowUserService from './ShowUserService';

let fakeUserRepository: FakeUserRepository;

let showUserService: ShowUserService;

describe('Show user', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    showUserService = new ShowUserService(fakeUserRepository);
  });
  it('should be able to show user', async () => {
    const user = await fakeUserRepository.create({
      name: 'natanael',
      password: '123456',
      email: 'natanael@gmail.com',
    });

    const userShow = await showUserService.execute({
      user_id: user.id,
    });

    expect(userShow.name).toBe('natanael');
    expect(userShow.password).toBe('123456');
    expect(userShow.email).toBe('natanael@gmail.com');
  });

  it('should not be able to show user if not exists', async () => {
    await expect(
      showUserService.execute({
        user_id: 'incorrect-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
