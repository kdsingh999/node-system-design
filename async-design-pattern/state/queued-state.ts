const FUNCTIONS_NEED_AUTH = ["sendMessage"];

class QueuedState {
  service: any;
  commandQueue: any[];

  constructor(service: any) {
    this.service = service;
    this.commandQueue = [];

    FUNCTIONS_NEED_AUTH.forEach((functionName) => {
      this[functionName] = (...args: any) => {
        console.log("Command Queued: ", functionName, args);
        return new Promise((resolve, reject) => {
          const command = () => {
            this.service[functionName](...args)?.then(resolve, reject);
          };

          this.commandQueue.push(command);
        });
      };
    });
  }

  disable() {
    this.commandQueue.forEach((command) => command());
    this.commandQueue = [];
  }
}

export { QueuedState };
