import { EventEmitter } from "events";

class MessageService extends EventEmitter {
  authenticated: boolean = false;

  authenticate(): void {
    setTimeout(
      () => this.emit("authenticated", (this.authenticated = true)),
      1000
    );
  }

  async sendMessage(message: string): Promise<any> {
    if (!this.authenticated) {
      console.log(`User is not authenticated`);
      return new Error(`User is not authenticated`);
    }
    console.log(`Sending message: ${message}`);
  }
}

export default MessageService;
