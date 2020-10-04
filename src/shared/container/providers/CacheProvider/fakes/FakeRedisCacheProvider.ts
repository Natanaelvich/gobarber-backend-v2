import ISendMailDTO from '../dtos/ISendMailDTO';
import ICacheProvider from '../models/ICacheProvider';

export default class FakeRedisCacheProvider implements ICacheProvider {
  public async save(key: string, value: string): Promise<void> {}

  public async recover(key: string): Promise<void> {}

  public async invalidate(key: string): Promise<void> {}
}
