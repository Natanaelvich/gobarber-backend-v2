import IMailProvider from '../models/IMailProvider';

export default class FakeDiskStorageProvider implements IMailProvider {
  private storage: string[] = [];

  public async sendMail(to: string, body: string): Promise<void> {}
}
