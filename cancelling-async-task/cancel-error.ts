class CancelError extends Error {
  constructor() {
    super("Async operation is canceled");
    this.name = "CancelError";
  }
}

export default CancelError;
