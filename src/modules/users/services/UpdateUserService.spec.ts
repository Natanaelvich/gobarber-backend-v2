import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import AppError from '@shared/errors/AppError';
import FakeBCryptHashProvider from '../providers/HashProvider/fakes/FakeBCryptHashProvider copy';
import UpdateUserService from './UpdateUserService';

let fakeUserRepository: FakeUserRepository;
let fakeBCryptHashProvider: FakeBCryptHashProvider;

let updateUser: UpdateUserService;

describe('Update user', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeBCryptHashProvider = new FakeBCryptHashProvider();

    updateUser = new UpdateUserService(
      fakeUserRepository,
      fakeBCryptHashProvider,
    );
  });

  it('should be able update profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'natanael',
      password: '123456',
      email: 'natanael@gmail.com',
    });

    const updatedUser = await updateUser.execute({
      user_id: user.id,
      name: 'natanael lima',
      email: 'natanaelima@gmail.com',
    });

    expect(updatedUser.name).toBe('natanael lima');
    expect(updatedUser.email).toBe('natanaelima@gmail.com');
  });

  it('should not be able to change to another user email', async () => {
    await fakeUserRepository.create({
      name: 'natanael',
      password: '123456',
      email: 'natanaellima@gmail.com',
    });
    const user = await fakeUserRepository.create({
      name: 'natanael lima',
      password: '123456',
      email: 'natanael@gmail.com',
    });

    await expect(
      updateUser.execute({
        user_id: user.id,
        name: 'natanael lima',
        email: 'natanaellima@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able update the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'natanael',
      password: '123456',
      email: 'natanael@gmail.com',
    });

    const updatedUser = await updateUser.execute({
      user_id: user.id,
      name: 'natanael lima',
      email: 'natanaelima@gmail.com',
      old_password: '123456',
      password: '123456878',
    });

    expect(updatedUser.password).toBe('123456878');
  });

  it('should not be able to password without oldPassword', async () => {
    const user = await fakeUserRepository.create({
      name: 'natanael',
      password: '123456',
      email: 'natanael@gmail.com',
    });

    await expect(
      updateUser.execute({
        user_id: user.id,
        name: 'natanael lima',
        email: 'natanaelima@gmail.com',
        password: '123456878',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to password without oldPassword', async () => {
    const user = await fakeUserRepository.create({
      name: 'natanael',
      password: '123456',
      email: 'natanael@gmail.com',
    });

    await expect(
      updateUser.execute({
        user_id: user.id,
        name: 'natanael lima',
        email: 'natanaelima@gmail.com',
        password: '123456878',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able update the if user not existing', async () => {
    await fakeUserRepository.create({
      name: 'natanael',
      password: '123456',
      email: 'natanael@gmail.com',
    });

    expect(
      updateUser.execute({
        user_id: 'incorrect-user-id',
        name: 'natanael lima',
        email: 'natanaelima@gmail.com',
        old_password: '123456',
        password: '123456878',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able update the password with wrong old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'natanael',
      password: '123456',
      email: 'natanael@gmail.com',
    });

    expect(
      updateUser.execute({
        user_id: user.id,
        name: 'natanael lima',
        email: 'natanaelima@gmail.com',
        old_password: 'wrond-old-password',
        password: '123456878',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
