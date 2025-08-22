export function someAsyncTask(id: number) {
  /* ... */
  console.log(`Async task with id=${id} is started`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Async task with id=${id} is finished`);
      resolve("Result of async task=" + id);
    }, 2000);
  });
}
