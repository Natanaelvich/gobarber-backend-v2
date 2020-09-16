import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';

describe('CreateApppointment', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const createUser = new CreateUserService(fakeUserRepository);

    const user = await createUser.execute({
      name: 'natanael',
      password: '123456',
      email: 'natanael@gmail.com',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('natanael');
  });

  it('should not be able to create a new user with same email', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const createUser = new CreateUserService(fakeUserRepository);

    const email = 'natanael@gmail.com';

    await createUser.execute({
      name: 'natanael',
      password: '123456',
      email,
    });

    expect(
      createUser.execute({
        name: 'natanael',
        password: '123456',
        email,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
