import { EventEmitter } from "events";
import { QueuedState } from "./queued-state";
import { ReadyState } from "./ready-state";
class StatefulMessageService extends EventEmitter {
  state: any;
  authenticated: boolean;

  constructor() {
    super();
    this.state = new QueuedState(this);
  }

  sendMessage(message: string) {
    this.state.sendMessage(message);
  }

  authenticate() {
    setTimeout(() => {
      this.authenticated = true;
      this.emit("authenticated");
      const prevState = this.state;
      this.state = new ReadyState();
      prevState.disable();
    }, 1000);
  }
}

const statefulMessageService = new StatefulMessageService();

export { statefulMessageService };
