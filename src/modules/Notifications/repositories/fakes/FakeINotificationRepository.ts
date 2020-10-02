import ICreateNotificationDTO from '@modules/Notifications/dtos/ICreateNotificationDTO';
import Notification from '@modules/Notifications/infra/typeorm/schemas/Notification';
import INotificationRepository from '../INotificationRepository';

class FakeINotificationRepository implements INotificationRepository {
  private notifications: Notification[] = [];

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, { content, recipient_id });

    this.notifications.push(notification);

    return notification;
  }
}

export default FakeINotificationRepository;
