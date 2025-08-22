import CancelError from "./cancel-error";

// Accepts a generator function and returns a wrapper
function createAsyncCancellable(
  generator: (...args: any[]) => Generator<any, any, any>
) {
  return function asyncCancellable(...args: any[]) {
    const iterator = generator(...args);
    let reqCanceled = false;

    function cancel() {
      reqCanceled = true;
    }

    const promise = new Promise((resolve, reject) => {
      async function step(prevResult: IteratorResult<any, any>) {
        if (reqCanceled) {
          return reject(new CancelError());
        }

        try {
          const { value, done } = prevResult;

          if (done) {
            return resolve(value);
          }

          const resolvedValue = await value;
          return step(iterator.next(resolvedValue));
        } catch (err) {
          try {
            return step(iterator.throw!(err));
          } catch (err2) {
            return reject(err2);
          }
        }
      }

      try {
        return step(iterator.next());
      } catch (err) {
        return reject(err);
      }
    });

    return { promise, cancel };
  };
}

export default createAsyncCancellable;
