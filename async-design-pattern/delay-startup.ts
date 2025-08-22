import MessageService from "./message-servce";
import { once } from "events";

const messageService = new MessageService();
async function init() {
  messageService.authenticate();
  await once(messageService, "authenticated");
}

async function notifyUser() {
  await messageService.sendMessage("Hello Users, How are you?");
}

init().then(() => {
  notifyUser();
});

setTimeout(() => {
  notifyUser();
}, 9000);
