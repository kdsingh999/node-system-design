import UserState from "./user-state";
class UserStateContext {
  private state: UserState;
  setState(state: UserState) {
    this.state = state;
  }
  getState() {
    return this.state.getState();
  }
  connect() {
    this.state.connect();
  }
  disconnect() {
    this.state.disconnect();
  }
}

export default UserStateContext;
