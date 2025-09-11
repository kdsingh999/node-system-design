import {
  ReadableStream,
  WritableStream,
  TransformStream,
} from "node:stream/web";
import { setInterval, setTimeout } from "node:timers/promises";
import { Readable } from "node:stream";

async function* myReadable() {
  yield Buffer.from("First Message ");
  await setTimeout(200);
  yield Buffer.from("Last Message");
}

const readable = Readable.toWeb(Readable.from(myReadable()));

// const readable = new ReadableStream({
//   async start(ctrl) {
//     let counter = 0;
//     for await (const i of setInterval(200)) {
//       ctrl.enqueue(`Message ${counter}`);
//       counter++;
//     }
//   },
// });

const transformStream = new TransformStream({
  transform(chunk: any, ctrl: any) {
    const newChunk = `${chunk} 🥰`;
    ctrl.enqueue(newChunk);
  },
});

const writable = new WritableStream({
  write(chunk: any) {
    console.log(`Chunk:${chunk}`);
  },
});

//readable -> .pipeThrough -> .pipeTo

readable.pipeThrough(transformStream).pipeTo(writable);
