import net from "node:net";
import { Writable } from "node:stream";

function log(message: String) {
  process.stdout.write(`\r${message}`);
}

const myWritable = new Writable({
  write(chunk: any, encoding: any, callback: Function) {
    //process the chunk
    const data = JSON.parse(chunk);
    const id = data.id;
    const message = data.message;

    if (message) {
      log(`${id} says:${message}`);
    } else {
      log(`My ID :${id}\n`);
    }

    log("Type something:");

    callback(null, chunk);
  },
});

process.stdin.pipe(net.connect(3000)).pipe(myWritable);
