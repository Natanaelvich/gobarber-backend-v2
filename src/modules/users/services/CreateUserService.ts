import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  constructor(private userRepository: IUserRepository) {}

  public async execute({ name, email, password }: Request): Promise<User> {
    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('this email already registered');
    }

    const hashedPassword = await hash(password, 8);

    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
