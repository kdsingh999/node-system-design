// import MessageService from "./message-servce";

// const messageService = new MessageService();
// // messageService.on("authenticated", () => console.log("Authenticated"));
// messageService.authenticate();
// messageService.sendMessage("Hello");

// import queuedMessageService from "./queued-message-service";

// queuedMessageService.authenticate();

// queuedMessageService.sendMessage("first message");

// setTimeout(() => queuedMessageService.sendMessage("second message"), 2000);

import { statefulMessageService } from "./state/stateful-message-service";

statefulMessageService.authenticate();
statefulMessageService.sendMessage("first message");
setTimeout(() => statefulMessageService.sendMessage("second message"), 2000);
