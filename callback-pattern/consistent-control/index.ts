import { fetchData } from "./fetch-data";
import { fetchAsyncData } from "./async-fetch-data";

function createDataWatcher(key: string) {
  let watchers: Function[] = [];
  fetchAsyncData(key, (data: any): any => {
    watchers.forEach((watcher: Function) => watcher(data));
  });

  return {
    onReady: (watcher: Function) => watchers.push(watcher),
  };
}
const dataWatcher = createDataWatcher("test");
dataWatcher.onReady((data: any) => {
  console.log(`this is first ${data}`);
  const dataWatcher2 = createDataWatcher("test");
  dataWatcher2.onReady((data2: any) => console.log(`this is second ${data2}`));
});
