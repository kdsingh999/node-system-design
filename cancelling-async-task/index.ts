import CancelError from "./cancel-error";
import createCancellable from "./create-cancable";
import { someAsyncTask } from "./some-async-task";
import createAsyncCancellable from "./create-async-cancalable";

// async function myFunction() {
//   const result1 = await someAsyncTask(1);
//   console.log(result1);

//   const result2 = await someAsyncTask(2);
//   console.log(result2);

//   const result3 = await someAsyncTask(3);
//   console.log(result3);
// }

// myFunction();
// const { cancel, cancelWrapper } = createCancellable();

// async function myFunction(createCancellable: any) {
//   const result1 = await createCancellable(someAsyncTask, 1);

//   console.log(result1);

//   const result2 = await createCancellable(someAsyncTask, 2);
//   console.log(result2);

//   const result3 = await createCancellable(someAsyncTask, 3);
//   console.log(result3);
// }

const cancellableFunction = createAsyncCancellable(function* () {
  const result1 = yield someAsyncTask(1);
  console.log(result1);
  const result2 = yield someAsyncTask(2);
  console.log(result2);
  const result3 = yield someAsyncTask(3);
  console.log(result3);
});

const { cancel, promise } = cancellableFunction();

promise.catch((error) => {
  if (error instanceof CancelError) {
    console.log(JSON.stringify(error));
  } else {
    console.log(JSON.stringify(error));
  }
});

setTimeout(() => {
  cancel();
}, 100);
