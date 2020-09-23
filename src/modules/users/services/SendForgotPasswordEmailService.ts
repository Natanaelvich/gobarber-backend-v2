import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import { inject, injectable } from 'tsyringe';
import IUserRepository from '../repositories/IUserRepository';

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
  ) {}

  public async execute({ email }: Request): Promise<void> {
    this.mailProvider.sendMail(email, 'teste de envio de email');
  }
}

export default SendForgotPasswordEmailService;
