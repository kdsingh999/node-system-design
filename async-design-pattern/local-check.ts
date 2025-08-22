import { once } from "events";

import MessageService from "./message-servce";

const messageService = new MessageService();

messageService.authenticate();

async function notifyUser() {
  if (!messageService.authenticated) {
    await once(messageService, "authenticated");
  }
  await messageService.sendMessage("Hello Users, How are you?");
}

notifyUser();

setTimeout(() => {
  notifyUser();
}, 9000);
