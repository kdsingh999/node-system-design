import { notificationRegistery } from "./notification-registery";

notificationRegistery.get("email")?.notify("Hello", "John");
notificationRegistery.get("sms")?.notify("Hello", "12345676897");
