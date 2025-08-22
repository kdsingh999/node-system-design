import CancelError from "./cancel-error";

function createCancellable() {
  let reqCanceled = false;

  function cancelWrapper<T>(
    promiseFn: (...args: any[]) => Promise<T>,
    ...args: any[]
  ): Promise<T> {
    if (reqCanceled) {
      return Promise.reject(new CancelError());
    }
    return promiseFn(...args);
  }

  function cancel() {
    reqCanceled = true;
  }

  return {
    cancelWrapper,
    cancel,
  };
}

export default createCancellable;
