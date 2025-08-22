import { EventEmitter } from "events";

class QueuedMessageService extends EventEmitter {
  authenticated: boolean = false;
  commandQueue: any = [];

  sendMessage(message: string) {
    if (!this.authenticated) {
      console.log("Requested Queued: ".concat(message));
      return new Promise((resolve, reject) => {
        const command = () => {
          this.sendMessage(message)?.then(resolve, reject);
        };

        this.commandQueue.push(command);
      });
    }
    console.log("Message sent: ".concat(message));
  }

  authenticate() {
    setTimeout(() => {
      this.authenticated = true;
      this.emit("authenticated");

      this.commandQueue.forEach((command) => command());
      this.commandQueue = [];
    }, 1000);
  }
}

const queuedMessageService = new QueuedMessageService();

export default queuedMessageService;
