import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import { v4 as uuidv4 } from 'uuid';
import IUserTokenRepository from '../IUserTokenRepository';

class FakeUserTokenRepository implements IUserTokenRepository {
  private tokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuidv4(),
      token: uuidv4(),
      user_id,
    });

    this.tokens.push(userToken);

    return userToken;
  }
}

export default FakeUserTokenRepository;
