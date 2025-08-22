import { EventEmitter } from "events";

class Notification extends EventEmitter {
  notify(item: String) {
    this.emit("event", item);
  }
}
