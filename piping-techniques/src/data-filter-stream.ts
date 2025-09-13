import { Transform } from "node:stream";

export function createDataFilterStream(criteria: any) {
  return new Transform({
    objectMode: true,

    transform(chunk, encoding, callback) {
      if (meetsCriteria(chunk, criteria)) {
        this.push(chunk);
      }

      callback();
    },
  });
  function meetsCriteria(record: any, criteria: any) {
    return record.age >= criteria.minAge;
  }
}
