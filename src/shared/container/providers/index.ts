import { container } from 'tsyringe';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';
import IMailProvider from './MailProvider/models/IMailProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';
import IStorageProvider from './StorageProvider/models/IStorageProvider';
import HandlebarsMailTemplateProvider from './TemplateMailProvider/implementations/HandlebarsMailTemplateProvider';
import ITemplateMailProvider from './TemplateMailProvider/models/ITemplateMailProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<ITemplateMailProvider>(
  'TemplateMailProvider',
  HandlebarsMailTemplateProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider),
);
