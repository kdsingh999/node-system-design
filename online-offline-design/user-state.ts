interface UserState {
  connect(): void;
  disconnect(): void;
  getState(): string;
}

export default UserState;
