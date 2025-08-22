const dataCached: Map<string, string> = new Map<string, string>();

export function fetchAsyncData(key: string, callback: (data: string) => void) {
  if (dataCached.has(key)) {
    process.nextTick(() => callback(dataCached.get(key)!));
  } else {
    setTimeout(() => {
      const fakeData = `Fetch Data from ${key}`;
      dataCached.set(key, fakeData);
      callback(dataCached.get(key)!);
    }, 500);
  }
}
