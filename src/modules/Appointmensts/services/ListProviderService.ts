import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { inject, injectable } from 'tsyringe';

interface Request {
  user_id: string;
}

@injectable()
class ListProviderService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: Request): Promise<User[]> {
    let users = await this.cacheProvider.recover<User[]>(
      `providers-list:${user_id}`,
    );

    if (!users) {
      users = await this.userRepository.findAllProviders({
        except_user_id: user_id,
      });
      await this.cacheProvider.save(`providers-list:${user_id}`, users);
    }

    console.log(users);

    return users;
  }
}

export default ListProviderService;
