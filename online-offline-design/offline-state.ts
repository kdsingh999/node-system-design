import UserState from "./user-state";
import UserStateContext from "./user-state-context";

class OfflineState implements UserState {
  private stateContext: UserStateContext;
  constructor(stateContext: UserStateContext) {
    this.stateContext = stateContext;
  }
  connect(): void {
    console.log("Connected to the server");
  }
  disconnect(): void {
    console.log("Disconnected from the server");
  }
  getState(): string {
    return "offline";
  }
}
