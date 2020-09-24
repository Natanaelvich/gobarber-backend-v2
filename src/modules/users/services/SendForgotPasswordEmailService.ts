import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
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

    @inject('userTokenRepository')
    private userTokenRepository: IUserTokenRepository,
  ) {}

  public async execute({ email }: Request): Promise<void> {
    const userExisits = await this.userRepository.findByEmail(email);

    if (!userExisits) {
      throw new AppError('User does not exists');
    }

    await this.userTokenRepository.generate(userExisits.id);

    this.mailProvider.sendMail(email, 'teste de envio de email');
  }
}

export default SendForgotPasswordEmailService;
