import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';

interface Request {
  user_id: string;
}

@injectable()
class ListProviderService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ user_id }: Request): Promise<User[]> {
    const users = await this.userRepository.findAllProviders({
      except_user_id: user_id,
    });

    return users;
  }
}

export default ListProviderService;
