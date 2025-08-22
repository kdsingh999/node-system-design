import Notification from "./notification";
class EmailNotifier implements Notification {
  notify(message: string, user: string): void {
    console.log(
      "Sending email to ".concat(user, " with message: ").concat(message)
    );
  }
}
export default EmailNotifier;
