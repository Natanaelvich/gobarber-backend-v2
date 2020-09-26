import { inject, injectable } from 'tsyringe';
import path from 'path';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';

interface Request {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
  ) {}

  public async execute({ email }: Request): Promise<void> {
    const userExisits = await this.userRepository.findByEmail(email);

    if (!userExisits) {
      throw new AppError('User does not exists');
    }

    const { token } = await this.userTokenRepository.generate(userExisits.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: userExisits.name,
        email: userExisits.email,
      },
      subject: '[Gobarber] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: userExisits.name,
          link: `http://localhost:3000/reset_password?tpken=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
