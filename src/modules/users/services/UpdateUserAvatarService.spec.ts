import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeDiskStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeDiskStorageProvider';
import AppError from '@shared/errors/AppError';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('Uptade user avatar', () => {
  it('should be able to update avatar user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeDiskStorageProvider = new FakeDiskStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeDiskStorageProvider,
    );

    const user = await fakeUserRepository.create({
      name: 'natanael',
      password: '123456',
      email: 'natanael@gmail.com',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update avatar from non existing user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeDiskStorageProvider = new FakeDiskStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeDiskStorageProvider,
    );

    expect(
      updateUserAvatar.execute({
        user_id: 'no-exists',
        avatarFileName: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete avatar user file', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeDiskStorageProvider = new FakeDiskStorageProvider();

    const deleteFile = jest.spyOn(fakeDiskStorageProvider, 'deleteFile');

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeDiskStorageProvider,
    );

    const user = await fakeUserRepository.create({
      name: 'natanael',
      password: '123456',
      email: 'natanael@gmail.com',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
  });
});
