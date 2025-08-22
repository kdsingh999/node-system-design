import Notification from "./notification";

class SmsNotifier implements Notification {
  notify(message: string, user: string): void {
    console.log(`Sending SMS to ${user}: ${message}`);
  }
}

export default SmsNotifier;
