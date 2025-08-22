import EmailNotifier from "./EmailNotifier";
import Notification from "./notification";
import SmsNotifier from "./SmsNotifier";

class NotificationRegistery {
  private map: Map<string, Notification> = new Map<string, Notification>();

  register(type: string, notification: Notification): void {
    this.map.set(type, notification);
  }

  get(type: string): Notification | undefined {
    return this.map.get(type);
  }
}

const notificationRegistery = new NotificationRegistery();
notificationRegistery.register("email", new EmailNotifier());
notificationRegistery.register("sms", new SmsNotifier());
export { notificationRegistery, NotificationRegistery };
