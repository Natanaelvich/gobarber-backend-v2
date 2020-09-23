import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/implementations/DiskStorageProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('Send ForgotPassword Email', () => {
  it('should be able to recover the password using the email', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeMailProvider,
    );

    await fakeUserRepository.create({
      name: 'natanael',
      email: 'natanael@gmail.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'natanael@gmail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });
});
