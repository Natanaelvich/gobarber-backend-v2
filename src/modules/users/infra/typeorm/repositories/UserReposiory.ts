import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import { getRepository, Repository } from 'typeorm';
import User from '../entities/User';

class UserReposiory implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { email },
    });

    return findUser;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne(id);

    return findUser;
  }

  public async create({
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<User> {
    const response = await this.ormRepository.create({
      name,
      email,
      password,
    });

    const user = await this.save(response);

    delete user.password;

    return user;
  }

  public async save(user: User): Promise<User> {
    const userSaved = await this.ormRepository.save(user);

    return userSaved;
  }
}

export default UserReposiory;
