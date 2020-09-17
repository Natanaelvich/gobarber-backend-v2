import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import AppError from '@shared/errors/AppError';
import FakeBCryptHashProvider from '../providers/HashProvider/fakes/FakeBCryptHashProvider copy';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('Autheticate user', () => {
  it('should be able to create a new authentication', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeBCryptHashProvider = new FakeBCryptHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeBCryptHashProvider,
    );

    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeBCryptHashProvider,
    );
    const user = await createUser.execute({
      name: 'natanael',
      password: '123456',
      email: 'natanael@gmail.com',
    });

    const response = await authenticateUser.execute({
      password: '123456',
      email: 'natanael@gmail.com',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeBCryptHashProvider = new FakeBCryptHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeBCryptHashProvider,
    );

    expect(
      authenticateUser.execute({
        password: '123456',
        email: 'natanael@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with incorrect password', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeBCryptHashProvider = new FakeBCryptHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeBCryptHashProvider,
    );

    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeBCryptHashProvider,
    );
    await createUser.execute({
      name: 'natanael',
      password: '123456',
      email: 'natanael@gmail.com',
    });

    expect(
      authenticateUser.execute({
        password: '123458',
        email: 'natanael@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
