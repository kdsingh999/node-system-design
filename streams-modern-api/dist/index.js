// import sqlite3 from "sqlite3";
// import { promisify } from "node:util";
// import { Readable } from "node:stream";
// import { pipeline } from "node:stream/promises";
// import { createWriteStream } from "node:fs";
// const connection = sqlite3.verbose();
// const db = new connection.Database("./data/db");
// const promisifiedSerialize = promisify(db.serialize.bind(db));
// const promisifiedRun = promisify(db.run.bind(db));
// const promisifiedAll = promisify(db.all.bind(db));
// await promisifiedSerialize();
// async function* findAllStream() {
//   let pageLimit = 10;
//   let skip = 0;
//   while (true) {
//     const data: any = await promisifiedAll(
//       `SELECT * FROM users ORDER BY age LIMIT ${pageLimit} OFFSET ${skip}`
//     );
//     skip += pageLimit;
//     if (!data.length) {
//       break;
//     }
//     for (const item of data) {
//       yield item;
//     }
//   }
// }
// const stream = Readable.from(findAllStream())
//   .map(async (item) => {
//     const name = await Promise.resolve(item.name.toUpperCase());
//     return {
//       ...item,
//       name,
//       editedAt: new Date().toISOString(),
//     };
//   })
//   .map((item) => {
//     return JSON.stringify(item).concat("\n");
//   });
// await pipeline(stream, createWriteStream("./data/output.json"));
// stream.forEach((item) => console.log(item));
// for await (const item of stream) {
//   console.log(item);
// }
import { pipeline } from "node:stream/promises";
import { setTimeout, setInterval } from "node:timers/promises";
async function* myReadable(ac) {
    for await (const _ of setInterval(200)) {
        if (ac.signal.aborted)
            break;
        yield Buffer.from("✅");
    }
}
async function* myWritable(source) {
    for await (const chunk of source) {
        console.log("Writable:", chunk.toString());
    }
}
const abortController = new AbortController();
// abort after 1 second
(async () => {
    await setTimeout(1000); // wait 1 second
    abortController.abort(); // then abort
})();
await pipeline(myReadable(abortController), // ✅ call it with AbortController
myWritable, // ✅ generator gets input from previous
{ signal: abortController.signal });
